/* tslint:disable:no-relative-imports */
import { SignedVerifiableClaim, isSignedVerifiableClaim } from '@po.et/poet-js'
import { AsyncTest, Expect, SetupFixture, TestCase, TestFixture } from 'alsatian'
import { pipe, not } from 'ramda'

import { AStudyInScarlet, TheMurdersInTheRueMorgue, TheRaven } from '../Claims'
import { Client } from './Helper'

@TestFixture('GET /works?issuer=...')
export class GetWorksByIssuer {
  private client: Client

  @SetupFixture
  public setupFixture() {
    this.client = new Client()
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer)
  @TestCase(TheMurdersInTheRueMorgue.issuer)
  @TestCase(AStudyInScarlet.issuer)
  async getWorksByIssuerShouldSucceed(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer)
  @TestCase(TheMurdersInTheRueMorgue.issuer)
  @TestCase(AStudyInScarlet.issuer)
  async getWorksByIssuerShouldReturnAnArray(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()

    Expect(claims).toBeDefined()
    Expect(Array.isArray(claims)).toBeTruthy()
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer)
  async getWorksByEAPPublicKeyShouldReturnTwoElements(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()

    Expect(claims.length).toBe(2)
  }

  @AsyncTest()
  @TestCase(AStudyInScarlet.issuer)
  async getWorksByACDPublicKeyShouldReturnOneElement(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()

    Expect(claims.length).toBe(1)
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer)
  @TestCase(TheMurdersInTheRueMorgue.issuer)
  @TestCase(AStudyInScarlet.issuer)
  async getWorksByIssuerShouldReturnClaims(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()
    const allElementsAreClaims = !claims.find(
      pipe(
        isSignedVerifiableClaim,
        not
      )
    )

    Expect(allElementsAreClaims).toBeTruthy()
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer)
  @TestCase(TheMurdersInTheRueMorgue.issuer)
  @TestCase(AStudyInScarlet.issuer)
  async getWorksByIssuerShouldReturnClaimsMatchingPublicKey(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()
    const allElementsMatchPublicKey = !claims.find((claim: SignedVerifiableClaim) => claim.issuer !== issuer)

    Expect(allElementsMatchPublicKey).toBeTruthy()
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer, [TheMurdersInTheRueMorgue, TheRaven])
  @TestCase(AStudyInScarlet.issuer, [AStudyInScarlet])
  async getWorksByIssuerShouldReturnExpectedFields(
    issuer: string,
    expectedClaims: ReadonlyArray<SignedVerifiableClaim>
  ) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims: ReadonlyArray<SignedVerifiableClaim> = await response.json()

    for (let i = 0; i < claims.length; i++) {
      Expect(claims[i].id).toBe(expectedClaims[i].id)
      Expect(claims[i].issuer).toBe(expectedClaims[i].issuer)
      Expect(claims[i]['sec:proof']).toBe(expectedClaims[i]['sec:proof'])
      Expect(claims[i].issuanceDate).toBe(expectedClaims[i].issuanceDate)
    }
  }

  @AsyncTest()
  @TestCase('')
  async getWorksShouldFailWith422WhenPassingAnInvalidArgument(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(422)
  }
}
