import BitcoinCore = require('bitcoin-core')
import { inject, injectable } from 'inversify'
import { Collection, Db } from 'mongodb'
import * as Pino from 'pino'

import { childWithFileName } from 'Helpers/Logging'
import { IPFSHashFailure } from 'Interfaces'

@injectable()
export class HealthController {
  private readonly db: Db
  private readonly collection: Collection
  private readonly bitcoinCore: BitcoinCore
  private readonly logger: Pino.Logger

  constructor(
    @inject('Logger') logger: Pino.Logger,
    @inject('DB') db: Db,
    @inject('BitcoinCore') bitcoinCore: BitcoinCore
  ) {
    this.logger = childWithFileName(logger, __filename)
    this.db = db
    this.collection = this.db.collection('health')
    this.bitcoinCore = bitcoinCore
  }

  async checkMongoConnection(): Promise<any> {
    this.logger.trace('MongoHealth', 'Checking Mongo...')
    const connection = await this.db.stats()
    const status = connection.ok
    const existing = await this.collection.findOne({ name: 'mongoConnected' })
    if (!existing) await this.collection.insertOne({ name: 'mongoConnected', status })
    else
      await this.collection.updateOne(
        { name: 'mongoConnected' },
        {
          $set: {
            status,
          },
        },
        { upsert: true }
      )
  }

  // async checkIpfsConnection(): Promise<any> {
  //   this.logger.trace('ipfsHealth', 'Checking IPFS...')
  //   const connection = await this.ipfs.checkHealth()
  //   return connection
  // }

  async getBlockchainInfo(): Promise<void> {
    const logger = this.logger.child({ method: 'getBlockchainInfo' })

    const {
      blocks,
      verificationprogress,
      bestblockhash,
      warnings,
      size_on_disk,
    } = await this.bitcoinCore.getBlockchainInfo().then((res: any) => res)
    const blockchainInfo = { blocks, verificationprogress, bestblockhash, warnings, size_on_disk }
    logger.trace(
      {
        blockchainInfo,
      },
      'Blockchain Info retrieved successfully.'
    )
    const existing = await this.collection.findOne({ name: 'blockchainInfo' })
    if (!existing) await this.collection.insertOne({ name: 'blockchainInfo', blockchainInfo })
    else
      await this.collection.updateOne(
        { name: 'blockchainInfo' },
        {
          $set: {
            blockchainInfo,
          },
        },
        { upsert: true }
      )
  }

  async getWalletInfo(): Promise<void> {
    const logger = this.logger.child({ method: 'getBalance' })

    const { balance, txcount } = await this.bitcoinCore.getWalletInfo()
    const walletInfo = { balance, txcount }
    logger.trace(
      {
        walletInfo,
      },
      'Bitcoin walletInfo retrieved successfully.'
    )
    const existing = await this.collection.findOne({ name: 'walletInfo' })
    if (!existing) await this.collection.insertOne({ name: 'walletInfo', walletInfo })
    else
      await this.collection.updateOne(
        { name: 'walletInfo' },
        {
          $set: {
            walletInfo,
          },
        },
        { upsert: true }
      )
  }

  async getNetworkInfo(): Promise<void> {
    const logger = this.logger.child({ method: 'getBalance' })

    const {
      version,
      subversion,
      connections,
      networkactive,
      protocolversion,
      warnings,
    } = await this.bitcoinCore.getNetworkInfo()
    const networkInfo = { version, subversion, connections, networkactive, protocolversion, warnings }
    logger.trace(
      {
        networkInfo,
      },
      'Bitcoin network info retrieved successfully.'
    )
    const existing = await this.collection.findOne({ name: 'networkInfo' })
    if (!existing) await this.collection.insertOne({ name: 'networkInfo', networkInfo })
    else
      await this.collection.updateOne(
        { name: 'networkInfo' },
        {
          $set: {
            networkInfo,
          },
        },
        { upsert: true }
      )
  }

  async updateIPFSFailures(ipfsHashFailures: ReadonlyArray<IPFSHashFailure>) {
    this.logger.debug({ ipfsHashFailures }, 'Updating IPFS Failures by IPFS Hash')
    const ipfsHashFailuresHashExisting = await Promise.all(
      ipfsHashFailures.map(async ({ ipfsFileHash, failureType, failureReason, failureTime }) => {
        const existing = await this.collection.findOne({
          name: 'ipfsDownloadRetries',
          'ipfsDownloadRetries.ipfsFileHash': ipfsFileHash,
        })
        const hashExisting = existing ? true : false
        return { ipfsFileHash, failureType, failureReason, failureTime, hashExisting }
      }))
    await Promise.all(
      ipfsHashFailuresHashExisting.map(({ ipfsFileHash, failureReason, failureType, failureTime, hashExisting }) => {
        if (!hashExisting) 
          this.collection.updateOne(
            { name: 'ipfsDownloadRetries' },
            {
              $push: {
                ipfsDownloadRetries: {
                  ipfsFileHash,
                  failureReason,
                  failureType,
                  lastDownloadAttemptTime: failureTime,
                  downloadAttempts: 1,
                },
              },
            }
          )
        else
          this.collection.updateOne(
            { name: 'ipfsDownloadRetries', 'ipfsDownloadRetries.ipfsFileHash': ipfsFileHash },
            {
              $set: {
                'ipfsDownloadRetries.$npm ru.failureReason': failureReason,
                'ipfsDownloadRetries.$.failureType': failureType,
                'ipfsDownloadRetries.$.lastDownloadAttemptTime': failureTime,
              },
              $inc: { 'ipfsDownloadRetries.$.downloadAttempts': 1 }
            }
          )
      })
    )
    return ipfsHashFailures
  }

  async upsertIPFSFailures(ipfsHashFailures: ReadonlyArray<IPFSHashFailure>) {
    this.logger.debug({ ipfsHashFailures }, 'Inserting IPFS Failures')
    const existing = await this.collection.findOne({ name: 'ipfsDownloadRetries' })
    if (!existing) {
      await Promise.all(
        ipfsHashFailures.map(({ failureReason, failureType, ipfsFileHash, failureTime }) => {
          this.collection.insertOne({
            name: 'ipfsDownloadRetries',
            ipfsDownloadRetries: [
              { ipfsFileHash, failureReason, failureType, lastDownloadAttemptTime: failureTime, downloadAttempts: 1 },
            ],
          })
        })
      )
    }
    else await this.updateIPFSFailures(ipfsHashFailures)
    return ipfsHashFailures
  }
}
