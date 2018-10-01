import { LoggingConfiguration, BitcoinRPCConfiguration } from 'Configuration'

import { HealthServiceConfiguration } from './HealthServiceConfiguration'


export interface HealthConfiguration extends LoggingConfiguration, BitcoinRPCConfiguration, HealthServiceConfiguration {
  readonly dbUrl: string
  readonly rabbitmqUrl: string
  readonly ipfsUrl: string
}
