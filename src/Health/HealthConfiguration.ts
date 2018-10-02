import { LoggingConfiguration, BitcoinRPCConfiguration } from 'Configuration'

import { HealthServiceConfiguration } from './HealthServiceConfiguration'
import { IPFSConfiguration } from './IPFSConfiguration'
import { ExchangeConfiguration } from './ExchangeConfiguration'


export interface HealthConfiguration extends LoggingConfiguration, BitcoinRPCConfiguration, HealthServiceConfiguration, IPFSConfiguration {
  readonly dbUrl: string
  readonly rabbitmqUrl: string
  readonly ipfsUrl: string
  readonly exchanges: ExchangeConfiguration
}
