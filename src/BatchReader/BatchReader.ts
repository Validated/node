import { Container } from 'inversify'
import { Db, MongoClient, Collection } from 'mongodb'
import * as Pino from 'pino'

import { createModuleLogger } from 'Helpers/Logging'
import { Messaging } from 'Messaging/Messaging'

import { BatchReaderConfiguration } from './BatchReaderConfiguration'
import { ClaimController } from './ClaimController'
import { Database } from './Database'
import { DatabaseMongo } from './DatabaseMongo'
import { IPFS } from './IPFS'
import { IPFSConfiguration } from './IPFSConfiguration'
import { Router } from './Router'
import { Service } from './Service'
import { ServiceConfiguration } from './ServiceConfiguration'

export class BatchReader {
  private readonly logger: Pino.Logger
  private readonly configuration: BatchReaderConfiguration
  private readonly container = new Container()
  private dbConnection: Db
  private router: Router
  private messaging: Messaging
  private service: Service

  constructor(configuration: BatchReaderConfiguration) {
    this.configuration = configuration
    this.logger = createModuleLogger(configuration, __dirname)
  }

  async start() {
    this.logger.info({ configuration: this.configuration }, 'BatchReader Starting')
    const mongoClient = await MongoClient.connect(this.configuration.dbUrl)
    this.dbConnection = await mongoClient.db()

    this.messaging = new Messaging(this.configuration.rabbitmqUrl)
    await this.messaging.start()

    this.initializeContainer()

    this.router = this.container.get('Router')
    await this.router.start()

    this.service = this.container.get('Service')
    await this.service.start()

    const database: DatabaseMongo = this.container.get('DatabaseMongo')
    await database.start()

    this.logger.info('BatchReader Started')
  }

  initializeContainer() {
    this.container.bind<Pino.Logger>('Logger').toConstantValue(this.logger)
    this.container.bind<ClaimController>('ClaimController').to(ClaimController)
    this.container.bind<Collection>('directoryCollection').toConstantValue(this.dbConnection.collection('batchReader'))
    this.container.bind<Db>('DB').toConstantValue(this.dbConnection)
    this.container.bind<Database>('Database').to(DatabaseMongo)
    this.container.bind<IPFS>('IPFS').to(IPFS)
    this.container.bind<IPFSConfiguration>('IPFSConfiguration').toConstantValue({
      ipfsUrl: this.configuration.ipfsUrl,
    })
    this.container.bind<Router>('Router').to(Router)
    this.container.bind<Messaging>('Messaging').toConstantValue(this.messaging)
    this.container.bind<Service>('Service').to(Service)
    this.container.bind<ServiceConfiguration>('ServiceConfiguration').toConstantValue({
      readNextDirectoryIntervalInSeconds: this.configuration.readNextDirectoryIntervalInSeconds,
    })
  }
}
