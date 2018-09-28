import { injectable, Container } from 'inversify'
import { Db, MongoClient } from 'mongodb'
import * as Pino from 'pino'

import { createModuleLogger } from 'Helpers/Logging'
import { Messaging } from 'Messaging/Messaging'

import { Router } from './Router'
import { HealthConfiguration } from './HealthConfiguration'
import { HealthController } from './HealthController'
import { IPFS } from './IPFS'
import { IPFSConfiguration } from './IPFSConfiguration'

@injectable()
export class Health {
  private readonly logger: Pino.Logger
  private readonly configuration: HealthConfiguration
  private readonly container = new Container()
  private mongoClient: MongoClient
  private dbConnection: Db
  private router: Router
  private messaging: Messaging

  constructor(configuration: HealthConfiguration) {
    this.configuration = configuration
    this.logger = createModuleLogger(configuration, __dirname)
  }

  async start() {
    this.logger.info({ configuration: this.configuration }, 'Health Starting')
    this.mongoClient = await MongoClient.connect(this.configuration.dbUrl)
    this.dbConnection = await this.mongoClient.db()

    this.messaging = new Messaging(this.configuration.rabbitmqUrl)
    await this.messaging.start()

    this.initializeContainer()

    this.router = this.container.get('Router')
    await this.router.start()

    this.logger.info('Health Started')
  }

  async stop() {
    this.logger.info('Stopping Health...')
    await this.router.stop()
    this.logger.info('Stopping Health Database...')
    await this.mongoClient.close()
  }

  initializeContainer() {
    this.container.bind<Pino.Logger>('Logger').toConstantValue(this.logger)
    this.container.bind<Db>('DB').toConstantValue(this.dbConnection)
    this.container.bind<Router>('Router').to(Router)
    this.container.bind<HealthController>('HealthController').to(HealthController)
    this.container.bind<IPFS>('IFPS').to(IPFS)
    this.container.bind<IPFSConfiguration>('IPFSConfiguration').toConstantValue({
      ipfsUrl: this.configuration.ipfsUrl,
    })
    this.container.bind<Messaging>('Messaging').toConstantValue(this.messaging)
  }
}
