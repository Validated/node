import { Messaging } from 'Messaging/Messaging'
import { Db, Server } from 'mongodb'
import * as Pino from 'pino'
import { describe } from 'riteway'

import { ClaimController } from './ClaimController'
import { ClaimControllerConfiguration } from './ClaimControllerConfiguration'
import { ExchangeConfiguration } from './ExchangeConfiguration'
import { IPFS } from './IPFS'
import { IPFSConfiguration } from './IPFSConfiguration'
import { Router } from './Router'

describe('StorageReader Router', async (assert: any) => {
  const host = 'http://localhost'
  const port = 3000
  const server = new Server(host, port)
  const IPFSConfiguration: IPFSConfiguration = {
    ipfsUrl: '',
    downloadTimeoutInSeconds: 1,
  }

  const claimControllerConfiguration: ClaimControllerConfiguration = {
    downloadRetryDelayInMinutes: 1,
    downloadMaxAttempts: 1,
  }

  const exchangeConfiguration: ExchangeConfiguration = {
    batchReaderReadNextDirectorySuccess: '',
  }

  const exchangeConfigurationMessaging: ExchangeConfiguration = {
    poetAnchorDownloaded: '',
    claimsDownloaded: '',
  }

  const claimController = new ClaimController(
    Pino(),
    new Db('poet', server),
    new Messaging('', exchangeConfigurationMessaging),
    new IPFS(IPFSConfiguration),
    claimControllerConfiguration
  )

  {
    const router = new Router(
      Pino(),
      new Messaging('', exchangeConfigurationMessaging),
      claimController,
      exchangeConfiguration
    )

    assert({
      given: 'the new instance of Router',
      should: 'be an instance of Router',
      actual: router instanceof Router,
      expected: true,
    })
  }
})
