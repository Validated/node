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
  id: 'a1055e3ff331f9cd15a3152dfa3fef198071685a1703f65cb890fc769e2a84c9',
  type: ClaimType.Work,
  issuer: issuerEAP,
  issuanceDate: '2018-10-12T00:24:56.012Z',
  claim: {
    name: 'The Raven',
    author: 'Edgar Allan Poe',
    tags: 'poem',
    dateCreated: '',
    datePublished: '1845-01-29T03:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-12T00:24:56Z'
      },
      'dc:creator': {
        '@id': issuerEAP
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ASOu_clNsR0MXn3SNdI42M9vgVF9nK7PVW20X1xuNnacKN76CNT2rRPR9JmeSAFkAq-IN5F05xUSrFbr3D-HDA',
      'sec:nonce': 'cjn59sno20002e3c9bxr5qu6i'
    }
  },
}

export const TheMurdersInTheRueMorgue: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'cc2fb84c9df2b6dbf754bee89d527bb46526bcfbd1ab14d37ae5e0b78643b4de',
  type: ClaimType.Work,
  issuer: issuerEAP,
  issuanceDate: '2018-10-11T21:44:59.879Z',
  claim: {
    name: 'The Murders in the Rue Morgue',
    author: 'Edgar Allan Poe',
    tags: 'short story, detective story, detective',
    dateCreated: '1841-01-01T00:00:00.000Z',
    datePublished: '1841-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:44:59Z'
      },
      'dc:creator': {
        '@id': issuerEAP
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..D0FdKRW-zsvD2ehQtPXHz_waJA2ZZrDim_lUNrSVp5mWq6CpjgN-RbE60-Dq6FwRgL_qMfd0EzLZ0z92s6HxDg',
      'sec:nonce': 'cjn542z9300015pc9aiz1xtcy'
    }
  },
}

export const AStudyInScarlet: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'f59b886562d0d2914c1ca7b7158a76d86363772765492c030012faf86eadd8ce',
  type: ClaimType.Work,
  issuer: issuerACD,
  issuanceDate: '2018-10-11T21:44:59.810Z',
  claim: {
    name: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    tags: 'detective novel, detective',
    dateCreated: '1886-01-01T00:00:00.000Z',
    datePublished: '1887-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:44:59Z'
      },
      'dc:creator': {
        '@id': issuerACD
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..49ulCwPtN4lDroYdPtGffS1qgWHH1SqPsmbzMYqFbk9fgxB1-yoLBLYoEwKiog_qBcrnBmcfAb5gluPVdvX_Dw',
      'sec:nonce': 'cjn542z7200005pc99xpi6lj8'
    }
  },
}

export const TheWeekOfDiana: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'c0a4d8f9e2cbe9d49196255f0fd54ff5f5b3e702e66c785ade176b0529590ca3',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:44:59.948Z',
  claim: {
    name: 'The Week of Diana',
    author: 'Maya Angelou',
    tags: 'poem',
    dateCreated: '1997-09-06T00:00:00.000Z',
    datePublished: '1997-09-06T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:44:59Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..armO2fm48HRG778ZJoZSA44zfffmJRHgqa6Y4kyCYBrU0S00DeluM4iO799YEQkpcwQPo4t-OK41uFE3spOJBQ',
      'sec:nonce': 'cjn542zap00025pc93yhzc7wo'
    }
  },
}

export const KnowWhyTheCagedBirdSings: SignedVerifiableClaim = {
  '@context': workContext,
  id: '1d1cf2f1488f3455b32fb9606107af0b599127c873cb2637394287b9c2b05334',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:44:59.971Z',
  claim: {
    name: 'Know Why the Caged Bird Sings',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1969-01-01T00:00:00.000Z',
    datePublished: '1969-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:44:59Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..9mvizV3N6RTRWwI2sG0x0L0AxfZJ03ovd8lpUlQYID_p9jyNUyeGN9QK0iwxbhk3HXBCfCfq6xo7IrXgZNqTBA',
      'sec:nonce': 'cjn542zbc00035pc9ks3e72bf'
    }
  },
}

export const GatherTogetherInMyName: SignedVerifiableClaim = {
  '@context': workContext,
  id: '519f67ee1ba69d69351b32c8bb96f573065088eea7d29dcfebc0aff4a73b31a2',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:44:59.996Z',
  claim: {
    name: 'Gather Together in My Name',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1974-01-01T00:00:00.000Z',
    datePublished: '1974-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Z6ndYK8t3ordhsIvQvZmYciGe8oTm9u17wt4qTVjj_UcoKIft3UAPiB1AWUfguI5x0byWvdabZ38qs2vsP8gDw',
      'sec:nonce': 'cjn542zc100045pc9kfhbszu5'
    }
  },
}

export const SinginAndSwinginAndGettingMerryLikeChristmas: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'c0cd2f3155ef40ce959a5945bc30babfbb9bd4f3ee136363b25addc7915c5c6a',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:45:00.018Z',
  claim: {
    name: "Singin' and Swingin' and Gettin' Merry Like Christmas",
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1976-01-01T00:00:00.000Z',
    datePublished: '1976-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Vuk8KY9FJFR3TsximbRcO5JRka7x79_tEf3U8yAzaiajYsc1gXpj_gViaY26cpWyP1dRZSj_XhGmtUJDlSgrDQ',
      'sec:nonce': 'cjn542zcp00055pc9tim8ekin'
    }
  },
}

export const TheHeartOfAWoman: SignedVerifiableClaim = {
  '@context': workContext,
  id: '3775b553b632cb4508285124dd8260f867d0f839b617b4f526d10a05e8b44901',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:45:00.051Z',
  claim: {
    name: 'The Heart of a Woman',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '1981-01-01T00:00:00.000Z',
    datePublished: '1981-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..wB41DW_zgEhbdKWFE3F8nVdXkvdVXK1FWycmAGuv0JQ4ZXDAcYWq74dJVP8v47--RaRPHtO0Wx4nrwdDKRMpCg',
      'sec:nonce': 'cjn542zdj00065pc9alf5r9pn'
    }
  },
}

export const AllGodsChildrenNeedTravelingShoes: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'f552ac4314a94e0e1f3ce6824209a1cbc10f181a6747a543f01df50f438015fc',
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
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..g2U8712LRqVskRXwA3RWYBdeHybFI6wOfGcdbSZYw-c5j6rWm0i-49zapuIP13q7Z8FywnI9KYTB10nGz8o8Ag',
      'sec:nonce': 'cjn542ze400075pc9gicbz451'
    }
  },
}

export const ASongFlungUpToHeaven: SignedVerifiableClaim = {
  '@context': workContext,
  id: '703f13a4ca7dc3d424d8386283fb78ae6bddd7e580b7ec74e6c153a10a2cc110',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:45:00.089Z',
  claim: {
    name: 'A Song Flung Up to Heaven',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '2002-01-01T00:00:00.000Z',
    datePublished: '2002-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..LeD1jeaEfgVQMD4tR-R22maCJhm7171THszTJPuuDUIlv0RnARJ1WzjeVfhl_Jk7bDSHtbjvOpHlCE35a1tYBA',
      'sec:nonce': 'cjn542zeu00085pc9gyizxk7c'
    }
  },
}

export const MomAndMeAndMom: SignedVerifiableClaim = {
  '@context': workContext,
  id: '7fef747449a249d569ba313d6127458b51d0b48e0abce847e25b0d49d1eab913',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:45:00.116Z',
  claim: {
    name: 'Mom & Me & Mom',
    author: 'Maya Angelou',
    tags: 'autobiography',
    dateCreated: '2013-01-01T00:00:00.000Z',
    datePublished: '2013-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19.._auczTN3ruXlGO4nM_KiwgjM1ou0Xo-nkzYp1SWzn5kj4a50AJz2XqRq6ukV-dAr-W0LfPPN4n5y8R278flfDQ',
      'sec:nonce': 'cjn542zfd00095pc9vovp7751'
    }
  },
}

export const OnThePulseOfMorning: SignedVerifiableClaim = {
  '@context': workContext,
  id: '3cd7fe9d28f2961f19e5f934fe36c899c6b8c97d779427c2689e2f07fc15630d',
  type: ClaimType.Work,
  issuer: issuerMA,
  issuanceDate: '2018-10-11T21:45:00.132Z',
  claim: {
    name: 'On the Pulse of Morning',
    author: 'Maya Angelou',
    tags: 'poem',
    dateCreated: '1993-01-01T00:00:00.000Z',
    datePublished: '1993-01-01T00:00:00.000Z',
  },
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..uF9ishmZa8rqZ-AoVgsMjPzKJDu6ZjtX6_l1_0gfIdpH3wD3I_DJtKEgpMXPF7ZaiVfYsoqZjUHKOThtX2JbCw',
      'sec:nonce': 'cjn542zft000a5pc9kf2o71o3'
    }
  },
}

export const ABraveAndStartlingTrugh: SignedVerifiableClaim = {
  '@context': workContext,
  id: 'f7fe3eee790192ffe74355aba0d8e0e5a5a672af37a2cb8dd587f51edb5b22b1',
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
  'sec:proof': {
    '@graph': {
      '@type': 'sec:Ed25519Signature2018',
      'dc:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2018-10-11T21:45:00Z'
      },
      'dc:creator': {
        '@id': issuerMA
      },
      'sec:jws': 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..r3lR7BlrSrIUKuTEItXS5YLOcOmIU_oYMIVtzTwgN1gH7vvTXm_7MqiFfkgKYnNZbb3D3AyMgmXAmYvNx4EaAg',
      'sec:nonce': 'cjn542zgi000b5pc96vhbn8mi'
    }
  },
}
