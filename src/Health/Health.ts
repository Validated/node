import BitcoinCore = require('bitcoin-core')
import { injectable, Container } from 'inversify'
import { Db, MongoClient } from 'mongodb'
import * as Pino from 'pino'

import { createModuleLogger } from 'Helpers/Logging'
import { Messaging } from 'Messaging/Messaging'

import { HealthConfiguration } from './HealthConfiguration'
import { HealthController } from './HealthController'
import { HealthService } from './HealthService'
import { HealthServiceConfiguration } from './HealthServiceConfiguration'
// import { IPFS } from './IPFS'
// import { IPFSConfiguration } from './IPFSConfiguration'

@injectable()
export class Health {
  private readonly logger: Pino.Logger
  private readonly configuration: HealthConfiguration
  private readonly container = new Container()
  private mongoClient: MongoClient
  private dbConnection: Db
  private cron: HealthService
  private messaging: Messaging

  constructor(configuration: HealthConfiguration) {
    this.configuration = configuration
    this.logger = createModuleLogger(configuration, __dirname)
  }

  async start() {
    this.logger.info({ configuration: this.configuration }, 'Health Starting')
    this.mongoClient = await MongoClient.connect(this.configuration.dbUrl)
    this.dbConnection = await this.mongoClient.db()

    this.messaging = new Messaging(this.configuration.rabbitmqUrl, this.configuration.exchanges)
    await this.messaging.start()

    this.initializeContainer()

    this.cron = this.container.get('Cron')
    await this.cron.start()

    this.logger.info('Health Started')
  }

  async stop() {
    this.logger.info('Stopping Health...')
    await this.cron.stop()
    this.logger.info('Stopping Health Database...')
    await this.mongoClient.close()
  }

  initializeContainer() {
    this.container.bind<Pino.Logger>('Logger').toConstantValue(this.logger)
    this.container.bind<Db>('DB').toConstantValue(this.dbConnection)
    this.container.bind<HealthService>('Cron').to(HealthService)
    this.container.bind<HealthController>('HealthController').to(HealthController)
    // this.container.bind<IPFS>('IFPS').to(IPFS)
    // this.container.bind<IPFSConfiguration>('IPFSConfiguration').toConstantValue({
    //   ipfsUrl: this.configuration.ipfsUrl,
    // })
    this.container.bind<Messaging>('Messaging').toConstantValue(this.messaging)
    this.container.bind<BitcoinCore>('BitcoinCore').toConstantValue(
      new BitcoinCore({
        host: this.configuration.bitcoinUrl,
        port: this.configuration.bitcoinPort,
        network: this.configuration.bitcoinNetwork,
        username: this.configuration.bitcoinUsername,
        password: this.configuration.bitcoinPassword,
      })
    )
    this.container.bind<HealthServiceConfiguration>('HealthServiceConfiguration').toConstantValue({
      healthIntervalInSeconds: this.configuration.healthIntervalInSeconds,
    })
  }
}
