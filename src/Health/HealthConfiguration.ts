import { LoggingConfiguration, BitcoinRPCConfiguration } from 'Configuration'

import { HealthServiceConfiguration } from './HealthServiceConfiguration'
import { IPFSConfiguration } from './IPFS'

export interface HealthConfiguration
  extends LoggingConfiguration,
    BitcoinRPCConfiguration,
    HealthServiceConfiguration,
    IPFSConfiguration {
  readonly dbUrl: string
  readonly rabbitmqUrl: string
}
