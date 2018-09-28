import { inject, injectable } from 'inversify'
import { Collection, Db } from 'mongodb'
import * as Pino from 'pino'


import { childWithFileName } from 'Helpers/Logging'

import { IPFS } from './IPFS'

@injectable()
export class HealthController {
  private readonly db: Db
  private readonly collection: Collection
  private readonly ipfs: IPFS
  private readonly logger: Pino.Logger


  constructor(@inject('Logger') logger: Pino.Logger, @inject('IPFS') ipfs: IPFS, @inject('DB') db: Db) {
    this.logger = childWithFileName(logger, __filename)
    this.db = db
    this.collection = this.db.collection('health')
    this.ipfs = ipfs
  }

  async checkMongoConnection(): Promise<any> {
    this.logger.trace('MongoHealth', 'Checking Mongo...')
    const connection = await this.db.stats()
    return connection.ok
  }

  async checkIpfsConnection(): Promise<any> {
    this.logger.trace('ipfsHealth', 'Checking IPFS...')
    const connection = await this.ipfs.checkHealth()
    return connection
  }
}
