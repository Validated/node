import { inject, injectable } from 'inversify'
import { Db, Collection } from 'mongodb'


export const isOkOne = ({ ok }: { ok: number }) => ok === 1

interface WalletInfo {
  readonly balance: number,
  readonly txcount: number
}

interface BlockChainInfo {
  readonly blocks: number
  readonly verificationprogress: number
  readonly bestblockhash: string
  readonly warnings: string
  readonly size_on_disk: number
}

interface NetworkInfo {
  readonly version: number
  readonly subversion: string
  readonly connections: number
  readonly networkactive: boolean
  readonly protocolversion: number
  readonly warnings: string
}

interface HealthObject {
  readonly mongoIsConnected: boolean
  readonly ipfsIsConnected: boolean
  readonly walletInfo: WalletInfo
  readonly blockchainInfo: BlockChainInfo
  readonly networkInfo: NetworkInfo
}

@injectable()
export class HealthController {
  private readonly db: Db
  private readonly collection: Collection

  constructor(@inject('DB') db: Db) {
    this.db = db
    this.collection = this.db.collection('health')
  }

  private async checkMongo(): Promise<boolean> {
    try {
      const mongoConnection = await this.db.stats()
      return isOkOne(mongoConnection)
    } catch (e) {
      return false
    }
  }

  private async checkIPFS(): Promise<any> {
    try {
      const { ipfsIsConnected } = (await this.collection.findOne({ name: 'ipfsConnected' })) || {
        ipfsIsConnected: 'Checking IPFS Connection...',
      }
      return ipfsIsConnected
    } catch (e) {
      return e
    }
  }

  private async getBlockchainInfo(): Promise<any> {
    try {
      const { blockchainInfo } = (await this.collection.findOne({ name: 'blockchainInfo' })) || {
        blockchainInfo: 'Getting Blockchain Info...',
      }
      return blockchainInfo
    } catch (e) {
      return e
    }
  }
  private async getWalletInfo(): Promise<any> {
    try {
      const { walletInfo } = (await this.collection.findOne({ name: 'walletInfo' })) || {
        walletInfo: 'Getting Wallet Info...',
      }
      return walletInfo
    } catch (e) {
      return e
    }
  }
  private async getNetworkInfo(): Promise<any> {
    try {
      const { networkInfo } = (await this.collection.findOne({ name: 'networkInfo' })) || {
        networkInfo: 'Getting Network Info...',
      }
      return networkInfo
    } catch (e) {
      return e
    }
  }

  async getHealth(): Promise<HealthObject> {
    const mongoIsConnected = await this.checkMongo()
    const ipfsIsConnected = await this.checkIPFS()
    const walletInfo = await this.getWalletInfo()
    const blockchainInfo = await this.getBlockchainInfo()
    const networkInfo = await this.getNetworkInfo()
    return {
      mongoIsConnected,
      ipfsIsConnected,
      walletInfo,
      blockchainInfo,
      networkInfo
    }
  }
}
