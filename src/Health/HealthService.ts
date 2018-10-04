import { Interval } from '@po.et/poet-js'
import { injectable, inject } from 'inversify'
import * as Pino from 'pino'

import { childWithFileName } from 'Helpers/Logging'
import { IPFSHashFailure } from 'Interfaces'
import { Messaging } from 'Messaging/Messaging'

import { HealthController } from './HealthController'
import { HealthServiceConfiguration } from './HealthServiceConfiguration'

@injectable()
export class HealthService {
  private readonly logger: Pino.Logger
  private readonly controller: HealthController
  private readonly configuration: HealthServiceConfiguration
  private readonly messaging: Messaging
  private readonly interval: Interval

  constructor(
    @inject('Logger') logger: Pino.Logger,
    @inject('HealthController') controller: HealthController,
    @inject('Messaging') messaging: Messaging,
    @inject('HealthServiceConfiguration') configuration: HealthServiceConfiguration
  ) {
    this.logger = childWithFileName(logger, __filename)
    this.controller = controller
    this.configuration = configuration
    this.messaging = messaging
    this.interval = new Interval(this.getHealth, this.configuration.healthIntervalInSeconds * 1000)
  }

  async start() {
    this.logger.info('Health Cron Starting...')
    this.interval.start()
  }

  async stop() {
    this.logger.info('Health Cron Stopping...')
    this.interval.stop()
  }

  onClaimsNotDownloaded = async (ipfsHashFailures: ReadonlyArray<IPFSHashFailure>) => {
    const logger = this.logger.child({ method: 'onClaimsNotDownloaded' })

    logger.trace({ ipfsHashFailures }, 'IPFS Download Failure')
    try {
      await this.controller.updateIPFSFailure(ipfsHashFailures)
    } catch (error) {
      logger.error({ error }, 'Failed to upsert ipfsHashFailures on health')
    }
  }

  private getHealth = async (): Promise<any> => {
    await this.controller.checkMongoConnection()
    await this.controller.getBlockchainInfo()
    await this.controller.getWalletInfo()
    await this.controller.getNetworkInfo()
    await this.messaging.consumeClaimsNotDownloaded(this.onClaimsNotDownloaded)
  }
}
