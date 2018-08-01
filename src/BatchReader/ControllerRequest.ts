import { PoetTimestamp } from '@po.et/poet-js'
import { inject, injectable } from 'inversify'
import * as Pino from 'pino'

import { childWithFileName } from 'Helpers/Logging'
import { Messaging } from 'Messaging/Messaging'

import { InteractorRequest } from './InteractorRequest'

@injectable()
export class ControllerRequest {
  private readonly logger: Pino.Logger
  private readonly messaging: Messaging
  private readonly request: InteractorRequest

  constructor(
    @inject('Logger') logger: Pino.Logger,
    @inject('Messaging') messaging: Messaging,
    @inject('InteractorRequest') request: InteractorRequest
  ) {
    this.logger = childWithFileName(logger, __filename)
    this.messaging = messaging
    this.request = request
  }

  async start() {
    await this.messaging.consumePoetTimestampsDownloaded(this.onPoetTimestampsDownloaded)
  }

  onPoetTimestampsDownloaded = async (poetTimestamps: ReadonlyArray<PoetTimestamp>): Promise<void> => {
    const logger = this.logger.child({ method: 'onPoetTimestampsDownloaded' })

    logger.trace(
      {
        poetTimestamps,
      },
      'Storing directory hashes from timestamps'
    )

    try {
      await this.request.addBatches(poetTimestamps.map(x => x.ipfsDirectoryHash))
    } catch (error) {
      logger.error({ error, poetTimestamps }, 'Failed to store directory hashes to DB collection')
    }
  }
}
