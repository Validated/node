/* tslint:disable:no-console */
/* tslint:disable:no-relative-imports */
import { configureCreateVerifiableClaim, getVerifiableClaimSigner } from '@po.et/poet-js'
import { pipeP } from 'ramda'

import {
  AStudyInScarlet,
  issuerACD,
  issuerEAP,
  issuerMA,
  TheMurdersInTheRueMorgue,
  TheWeekOfDiana,
  KnowWhyTheCagedBirdSings,
  GatherTogetherInMyName,
  SinginAndSwinginAndGettingMerryLikeChristmas,
  TheHeartOfAWoman,
  AllGodsChildrenNeedTravelingShoes,
  ASongFlungUpToHeaven,
  MomAndMeAndMom,
  OnThePulseOfMorning,
  ABraveAndStartlingTrugh,
  PrivateKeyACD,
  PrivateKeyEAP,
  PrivateKeyMA,
} from './Claims'

const { configureSignVerifiableClaim } = getVerifiableClaimSigner()

const createACDWorkClaim = configureCreateVerifiableClaim({ issuer: issuerACD })
const createEAPWorkClaim = configureCreateVerifiableClaim({ issuer: issuerEAP })
const createMAWorkClaim = configureCreateVerifiableClaim({ issuer: issuerMA })

const signACDWorkClaim = configureSignVerifiableClaim({ privateKey: PrivateKeyACD })
const signEAPWorkClaim = configureSignVerifiableClaim({ privateKey: PrivateKeyEAP })
const signMAWorkClaim = configureSignVerifiableClaim({ privateKey: PrivateKeyMA })

const createACDClaim = pipeP(
  createACDWorkClaim,
  signACDWorkClaim
)

const createEAPClaim = pipeP(
  createEAPWorkClaim,
  signEAPWorkClaim
)

const createMAClaim = pipeP(
  createMAWorkClaim,
  signMAWorkClaim
)

const setUpClaims = async () => {
  console.log(JSON.stringify(await createACDClaim(AStudyInScarlet.claim), null, 2))
  console.log(JSON.stringify(await createEAPClaim(TheMurdersInTheRueMorgue.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(TheWeekOfDiana.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(KnowWhyTheCagedBirdSings.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(GatherTogetherInMyName.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(SinginAndSwinginAndGettingMerryLikeChristmas.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(TheHeartOfAWoman.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(AllGodsChildrenNeedTravelingShoes.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(ASongFlungUpToHeaven.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(MomAndMeAndMom.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(OnThePulseOfMorning.claim), null, 2))
  console.log(JSON.stringify(await createMAClaim(ABraveAndStartlingTrugh.claim), null, 2))
}

setUpClaims().catch(console.error)
