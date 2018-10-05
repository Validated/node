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
    const { status } = await this.collection.findOne({ name: 'mongoConnected' }) || { status: 2 }
    const mongoIsConnected = status === 1 ? true : status === 2 ? 'Getting MongoDb Connection Status...' : false;
    const { blockchainInfo } = await this.collection.findOne({ name: 'blockchainInfo' }) || { blockchainInfo: 'Getting Blockchain Info...'}
    const { walletInfo } = await this.collection.findOne({ name: 'walletInfo' }) || { walletInfo : 'Getting Wallet Info...'}
    const { networkInfo } = await this.collection.findOne({ name: 'networkInfo' }) || { networkInfo: 'Getting Network Info...'}
    const { ipfsDownloadRetries } = await this.collection.findOne({ name: 'ipfsDownloadRetries' }) || { ipfsDownloadRetries: 'No IFPS Download Retries'}
    return {
      mongoIsConnected,
      blockchainInfo,
      walletInfo,
      networkInfo,
      ipfsDownloadRetries,
    }
  }
}
