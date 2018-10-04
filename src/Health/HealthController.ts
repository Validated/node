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
  // private readonly ipfs: IPFS
  private readonly bitcoinCore: BitcoinCore
  private readonly logger: Pino.Logger

  constructor(
    @inject('Logger') logger: Pino.Logger,
    // @inject('IPFS') ipfs: IPFS,
    @inject('DB') db: Db,
    @inject('BitcoinCore') bitcoinCore: BitcoinCore
  ) {
    this.logger = childWithFileName(logger, __filename)
    this.db = db
    this.collection = this.db.collection('health')
    this.bitcoinCore = bitcoinCore
    // this.ipfs = ipfs
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

  async updateIPFSFailure(ipfsHashFailures: ReadonlyArray<IPFSHashFailure>) {
    this.logger.debug({ ipfsHashFailures }, 'Upserting Claims by IPFS Hash')
    const existing = await this.collection.findOne({ name: 'ipfsHashFailures' })
    await Promise.all(
      ipfsHashFailures.map(({ failureReason, failureType, ipfsFileHash }) => {
        // if (!existing)
          this.collection.insertOne({
            name: 'ipfsHashFailures',
            ipfsHashFailures: [{ ipfsFileHash, failureReason, failureType }],
          })
        // else {
        //   const hashExisting = this.collection.findOne({
        //     name: 'ipfsHashFailures',
        //     'ipfsHashFailures.ipfsFileHash': ipfsFileHash,
        //   })
        //   if (!hashExisting)
        //     this.collection.updateOne(
        //       { name: 'ipfsHashFailures' },
        //       { $push: { ipfsHashFailures: { ipfsFileHash, failureReason, failureType } } }
        //     )
        //   else
        //     this.collection.updateOne(
        //       { name: 'ipfsHashFailures', 'ipfsHashFailures.ipfsFileHash': ipfsFileHash },
        //       { $set: { 'ipfsHashFailures.$': { ipfsFileHash, failureReason, failureType } } }
        //     )
        // }
      })
    )
  }
}
