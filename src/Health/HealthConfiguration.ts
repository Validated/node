import { LoggingConfiguration } from 'Configuration'

export interface HealthConfiguration extends LoggingConfiguration {
  readonly dbUrl: string
  readonly rabbitmqUrl: string
  readonly ipfsUrl: string
}
