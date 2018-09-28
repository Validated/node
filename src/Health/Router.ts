import * as http from 'http'
import { injectable, inject } from 'inversify'
import * as Pino from 'pino'

import { childWithFileName } from 'Helpers/Logging'

import { HealthController } from './HealthController'

@injectable()
export class Router {
  private readonly logger: Pino.Logger
  private readonly controller: HealthController
  private server: http.Server

  constructor(
    @inject('Logger') logger: Pino.Logger,
    @inject('HealthController') controller: HealthController
  ) {
    this.logger = childWithFileName(logger, __filename)
    this.controller = controller;
  }

  async start() {
  }

  async stop() {
  }

  private getHealth = async ():Promise<any> => {
  }
}
