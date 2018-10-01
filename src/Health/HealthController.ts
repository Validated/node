import BitcoinCore = require('bitcoin-core')
import { inject, injectable } from 'inversify'
import { Collection, Db } from 'mongodb'
import * as Pino from 'pino'


import { childWithFileName } from 'Helpers/Logging'

// import { IPFS } from './IPFS'

@injectable()
export class HealthController {
  private readonly db: Db
  private readonly collection: Collection
  // private readonly ipfs: IPFS
  private readonly bitcoinCore: BitcoinCore
  private readonly logger: Pino.Logger


  constructor(@inject('Logger') logger: Pino.Logger, @inject('DB') db: Db, @inject('BitcoinCore') bitcoinCore: BitcoinCore) {
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
    const existing = await this.collection.findOne({ name: 'mongoHealth' })
    if(existing) {
      await this.collection.updateOne(
        { name: 'mongoHealth' },
        {
          $set: {
            status,
          },
        },
        { upsert: true }
      )
    } else {
      await this.collection.insertOne({ name: 'mongoHealth', status })
    }
  }

  // async checkIpfsConnection(): Promise<any> {
  //   this.logger.trace('ipfsHealth', 'Checking IPFS...')
  //   const connection = await this.ipfs.checkHealth()
  //   return connection
  // }


  async getBlockchainInfo(): Promise<void> {
    const logger = this.logger.child({ method: 'getBlockchainInfo' })

    const blockchainInfo = await this.bitcoinCore.getBlockchainInfo()

    logger.trace(
      {
        blockchainInfo,
      },
      'Blockchain Info retrieved successfully.'
    )

    await this.collection.updateOne(
      { blockchainInfo },
      { upsert: true }
    )
  }
}
