/* tslint:disable:max-line-length */
import {
  ClaimType,
  createIssuerFromPrivateKey,
  DefaultClaimContext,
  DefaultWorkClaimContext,
  SignedVerifiableClaim,
} from '@po.et/poet-js'

const workContext = {
  ...DefaultClaimContext,
  ...DefaultWorkClaimContext,
}

export const PrivateKeyEAP = '2PU815H2Sgqhadmfj8F2sK7NF9HKdGtzQn97bS897iBhTPr1uK5N4U2W2CfsVrE6DpFU1E7QnmagE4yENZw1eqm9'
export const PrivateKeyACD = '2fac76SnmCGNE8DRYgiAdt2hB2J5GnKJ8wzPL6uu1AUVexnbuRnfRAsZU5ZNX46rASXWvvP5n8J153h2kbg66Uja'
export const PrivateKeyMA = '2YjQfpYKRJXC37DxNmZ4NenmRCjKUrs6iBGuTRWWVNaMoEPTtbm61DYAqNoYQkHAVbRSyTjWxF6eR9Bw44U1o2qS'

export const issuerEAP = createIssuerFromPrivateKey(PrivateKeyEAP)
export const issuerACD = createIssuerFromPrivateKey(PrivateKeyACD)
export const issuerMA = createIssuerFromPrivateKey(PrivateKeyMA)

export const TheRaven: SignedVerifiableClaim = {
  '@context': workContext,
  id: '1bb5e7959c7cb28936ec93eb6893094241a5bc396f08845b4f52c86034f0ddf8',
  type: ClaimType.Work,
  issuer: issuerEAP,
  issuanceDate: '2017-11-13T15:00:00.000Z',
  claim: {
    name: 'The Raven',
    author: 'Edgar Allan Poe',
    tags: 'poem',
    dateCreated: '',
    datePublished: '1845-01-29T03:00:00.000Z',
  },
  'sec:proof': {},
}

export const TheMurdersInTheRueMorgue: SignedVerifiableClaim = {
  '@context': workContext,
  id: '15867401b92567b4f7ea83e39a646ab9eb581b560bc78488b7a0c1b586c70215',
  type: ClaimType.Work,
  issuer: issuerEAP,
  issuanceDate: '2017-12-11T22:58:11.375Z',
  claim: {
    name: 'The Murders in the Rue Morgue',
    author: 'Edgar Allan Poe',
    tags: 'short story, detective story, detective',
    dateCreated: '1841-01-01T00:00:00.000Z',
    datePublished: '1841-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const AStudyInScarlet: SignedVerifiableClaim = {
  '@context': workContext,
  id: '33ebc219caa62d07e3f27f891620d24499e53811b81f72762f6240d7b92dcbf3',
  type: ClaimType.Work,
  issuer: issuerACD,
  issuanceDate: '2017-12-11T22:58:11.327Z',
  claim: {
    name: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    tags: 'detective novel, detective',
    dateCreated: '1886-01-01T00:00:00.000Z',
    datePublished: '1887-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const TheWeekOfDiana: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'fe3aa85a31323d73515893ca5f8db7c11af536ea665374ee00bad1d0f7d26b4d',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.909Z',
  claim: {
    name: 'The Week of Diana',
    author: 'Maya Angelou',
    tags: 'poem',
    dateCreated: '1997-09-06T00:00:00.000Z',
    datePublished: '1997-09-06T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const KnowWhyTheCagedBirdSings: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'a5ad28f528327d89dfea9c8c752722ecfe34860e896a5f868b045d631d4a8baf',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.940Z',
  claim: {
    name: 'Know Why the Caged Bird Sings',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1969-01-01T00:00:00.000Z',
    datePublished: '1969-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const GatherTogetherInMyName: SignedVerifiableClaim = {
  '@context': workContext,
  id: '43eea2bc07c2de051a8e389b7db11dedcf4e7d65fcb86a4cb758447a2f4c1bc2',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.950Z',
  claim: {
    name: 'Gather Together in My Name',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1974-01-01T00:00:00.000Z',
    datePublished: '1974-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const SinginAndSwinginAndGettingMerryLikeChristmas: SignedVerifiableClaim = {
  '@context': workContext,
  id: '91c23a6f14b1afde4b1ccde0c1ad4ecf17c029ebf81547fa16f2e4fc37dd19a6',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.962Z',
  claim: {
    name: "Singin' and Swingin' and Gettin' Merry Like Christmas",
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1976-01-01T00:00:00.000Z',
    datePublished: '1976-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const TheHeartOfAWoman: SignedVerifiableClaim = {
  '@context': workContext,
  id: '756ecd1fc0624c8d3012123fc5cb9a2749317205cd3a727dcd661e7c87c34b8f',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.970Z',
  claim: {
    name: 'The Heart of a Woman',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1981-01-01T00:00:00.000Z',
    datePublished: '1981-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const AllGodsChildrenNeedTravelingShoes: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'f1178b50664534ceca141d1095bf0220739c928f8229156f0936cd6d4ca04b50',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.978Z',
  claim: {
    name: "All God's Children Need Traveling Shoes",
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1986-01-01T00:00:00.000Z',
    datePublished: '1986-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const ASongFlungUpToHeaven: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'db3dc4951ec124302321fae346916bb4323bee5be21ee85fea2a165cd089138a',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:13.991Z',
  claim: {
    name: 'A Song Flung Up to Heaven',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '2002-01-01T00:00:00.000Z',
    datePublished: '2002-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const MomAndMeAndMom: SignedVerifiableClaim = {
  '@context': workContext,
  id: '6808946ff36160771b55371655d92161c331893bafbbab05fb4aebfbb2c63170',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:14.002Z',
  claim: {
    name: 'Mom & Me & Mom',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '2013-01-01T00:00:00.000Z',
    datePublished: '2013-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const OnThePulseOfMorning: SignedVerifiableClaim = {
  '@context': workContext,
  id: '95c8c7220ec2aa151abba6106f471b21e3a4e2705e95883cedc43119e20629ad',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:14.010Z',
  claim: {
    name: 'On the Pulse of Morning',
    author: 'Maya Angelou',
    tags: 'poem',
    dateCreated: '1993-01-01T00:00:00.000Z',
    datePublished: '1993-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}

export const ABraveAndStartlingTrugh: SignedVerifiableClaim = {
  '@context': workContext,
  id: '87e5629053d5d8c29372d9e5a18542cd6d7080ba80b7261e371b08c7ddcc9baa',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-07-31T22:29:14.019Z',
  claim: {
    name: 'A Brave and Startling Truth',
    author: 'Maya Angelou',
    tags: 'poem',
    dateCreated: '1995-01-01T00:00:00.000Z',
    datePublished: '1995-01-01T00:00:00.000Z',
  },
  'sec:proof': {},
}
