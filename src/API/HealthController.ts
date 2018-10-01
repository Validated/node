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

  async checkMongoConnection(): Promise<any> {
    const connection = await this.collection.findOne({ name: 'mongoHealth' })
    return connection.status === 1 ? 'connected' : 'not connected'
  }
}
