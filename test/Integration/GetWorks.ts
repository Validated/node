/* tslint:disable:no-relative-imports */
import { SignedVerifiableClaim, isSignedVerifiableClaim } from '@po.et/poet-js'
import { AsyncTest, Expect, SetupFixture, TestCase, TestFixture } from 'alsatian'
import { pipe, not } from 'ramda'

import { TheRaven, ABraveAndStartlingTruth } from '../Claims'
import { Client } from './Helper'

@TestFixture('GET /works')
export class GetWorks {
  private client: Client

  @SetupFixture
  public setupFixture() {
    this.client = new Client()
  }

  @AsyncTest()
  @TestCase()
  async getWorksShouldSucceed() {
    const response = await this.client.getWorks()

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()
  }

  @AsyncTest()
  @TestCase()
  async getWorksShouldReturnAnArray() {
    const response = await this.client.getWorks()

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()

    Expect(claims).toBeDefined()
    Expect(Array.isArray(claims)).toBeTruthy()
  }

  @AsyncTest()
  @TestCase()
  async getWorksShouldReturnAtLeast3() {
    const response = await this.client.getWorks()
    const claims = await response.json()
    const greaterThanThree = claims.length >= 3
    Expect(greaterThanThree).toBeTruthy()
  }

  @AsyncTest()
  @TestCase()
  async getWorksShouldReturnOnly10() {
    const response = await this.client.getWorks()
    const claims = await response.json()
    const lessThan10 = claims.length <= 10
    Expect(lessThan10).toBeTruthy()
  }

  @AsyncTest()
  @TestCase('4')
  async getLimitedWorksShouldReturnLimit(limit: string) {
    const response = await this.client.getLimitedWorks(limit)
    const claims = await response.json()
    const lessThan4 = claims.length <= 4
    Expect(lessThan4).toBeTruthy()
  }

  @AsyncTest()
  @TestCase(ABraveAndStartlingTruth.issuer)
  async getWorksShouldReturnCountInHeader(issuer: string) {
    const response = await this.client.getWorksByIssuer(issuer)
    const totalCount = await response.headers.get('X-Total-Count')
    const isEqualToClaimsAvailable = parseInt(totalCount, 10) === 10
    Expect(isEqualToClaimsAvailable).toBeTruthy()
  }

  @AsyncTest()
  @TestCase('5', ABraveAndStartlingTruth.issuer)
  async getOffsetAngelouWorksShouldReturn5(offset: string, issuer: string) {
    const response = await this.client.getOffsetPublicKeyWorks(offset, issuer)
    const claims = await response.json()
    const equalTo5 = (claims.length = 5)
    Expect(equalTo5).toBeTruthy()
  }

  @AsyncTest()
  @TestCase()
  async getWorksShouldReturnClaims() {
    const response = await this.client.getWorks()

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims = await response.json()
    const allElementsAreClaims = !claims.some(
      pipe(
        isSignedVerifiableClaim,
        not
      )
    )

    Expect(allElementsAreClaims).toBeTruthy()
  }

  @AsyncTest()
  @TestCase()
  async getWorksShouldReturnExpectedFields() {
    const response = await this.client.getWorks()

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()

    const claims: ReadonlyArray<SignedVerifiableClaim> = await response.json()

    for (const claim of claims) {
      Expect(claim.id).toBeTruthy()
      Expect(claim.issuer).toBeTruthy()
      Expect(claim['sec:proof']).toBeTruthy()
      Expect(claim.issuanceDate).toBeTruthy()
    }
  }

  @AsyncTest()
  @TestCase('test')
  async getWorksShouldFailWith422WhenPassingAnInvalidArgument(test: string) {
    const response = await this.client.getWorksTest(test)

    Expect(response.status).toBe(422)
  }

  @AsyncTest()
  @TestCase(TheRaven.issuer)
  async getWorksShouldReturnMoreThanByPublicKey(issuer?: string) {
    const response = await this.client.getWorks()
    const issuerResponse = await this.client.getWorksByIssuer(issuer)

    Expect(response.status).toBe(200)
    Expect(response.ok).toBeTruthy()
    Expect(issuerResponse.status).toBe(200)
    Expect(issuerResponse.ok).toBeTruthy()

    const claims = await response.json()
    const issuerClaims = await issuerResponse.json()
    const getWorksReturnsMore = claims.length > issuerClaims.length

    Expect(getWorksReturnsMore).toBeTruthy()
  }
}
