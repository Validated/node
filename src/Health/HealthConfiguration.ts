import { LoggingConfiguration, BitcoinRPCConfiguration } from 'Configuration'

import { ExchangeConfiguration } from './ExchangeConfiguration'
import { HealthServiceConfiguration } from './HealthServiceConfiguration'

export interface HealthConfiguration
  extends LoggingConfiguration,
    BitcoinRPCConfiguration,
    HealthServiceConfiguration {
  readonly dbUrl: string
  readonly rabbitmqUrl: string
  readonly exchanges: ExchangeConfiguration
}

