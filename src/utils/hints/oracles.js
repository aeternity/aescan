export const oraclesHints = {
  oracleId: 'Identifier of Oracle that is similar to the address of the Account that registered the Oracle. The only difference is the prefix that will be ok_ instead of ak_. This means that each account can only host 1 oracle. It\'s not possible to manage multiple oracles using the same account.',
  oracleRegistered: 'To register an Oracle you need to provide a queryFormat and a responseFormat to the registerOracle function of the SDK. In addition to the common transaction options you can provide the oracle specific options queryFee and oracleTtlValue',
  oracleExpiration: 'By default the Oracle will exist for the next 500 Keyblocks. If you intend to keep your oracle running longer you should increase the oracleTtlValue and/or set up a service that automatically extends the TTL before it expires.',
  queryFee: 'Price for querying Oracle. QueryFee is optional and defaults to 30000',
}
