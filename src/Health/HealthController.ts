import BitcoinCore = require('bitcoin-core')
import { inject, injectable } from 'inversify'
import { Collection, Db } from 'mongodb'
import * as Pino from 'pino'

import { childWithFileName } from 'Helpers/Logging'

export const isStatus200 = ({ status }: { status: number }) => status === 200

@injectable()
export class HealthController {
  private readonly db: Db
  private readonly collection: Collection
  private readonly bitcoinCore: BitcoinCore
  private readonly logger: Pino.Logger

  constructor(
    @inject('Logger') logger: Pino.Logger,
    @inject('DB') db: Db,
    @inject('BitcoinCore') bitcoinCore: BitcoinCore,
  ) {
    this.logger = childWithFileName(logger, __filename)
    this.db = db
    this.collection = this.db.collection('health')
    this.bitcoinCore = bitcoinCore
  }

  async getBlockchainInfo(): Promise<void> {
    const logger = this.logger.child({ method: 'getBlockchainInfo' })

    const {
      blocks,
      verificationprogress,
      bestblockhash,
      warnings,
      size_on_disk,
    } = await this.bitcoinCore.getBlockchainInfo()
    const blockchainInfo = { blocks, verificationprogress, bestblockhash, warnings, size_on_disk }
    logger.trace(
      {
        blockchainInfo,
      },
      'Blockchain Info retrieved successfully.'
    )
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
}
