import { inject, injectable } from 'inversify'
import { Db, Collection } from 'mongodb'

@injectable()
export class HealthController {
  private readonly db: Db
  private readonly collection: Collection

  constructor(@inject('DB') db: Db) {
    this.db = db
    this.collection = this.db.collection('health')
  }

  async getHealth(): Promise<any> {
    const connection = await this.collection.findOne({ name: 'mongoConnected' })
    const { blockchainInfo } = await this.collection.findOne({ name: 'blockchainInfo' })
    const { walletInfo } = await this.collection.findOne({ name: 'walletInfo' })
    const { networkInfo } = await this.collection.findOne({ name: 'networkInfo' })
    const ipfsFileHashes = await this.collection.findOne({ name: 'ipfsHashFailures' })
    const isConnected = connection.status === 1 ? true : false
    return {
      isConnected,
      blockchainInfo,
      walletInfo,
      networkInfo,
      ipfsFileHashes,
    }
  }
}
