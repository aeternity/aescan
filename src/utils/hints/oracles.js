export const oraclesHints = {
  oracleId: 'Identifier of Oracle. The oracleId will be similar to the address of the account that registered the Oracle. The only difference is the prefix that will be ok_ instead of ak_. This means that each account can only host 1 oracle. It\'s not possible to manage multiple oracles using the same account',
  oracleRegistered: 'To register an oracle you need to provide a queryFormat and a responseFormat to the registerOracle function of the SDK. In addition to the common transaction options you can provide the oracle specific options queryFee and oracleTtlValue',
  oracleExpiration: 'By default the oracle will exist for the next 500 KeyBlocks. If you intend to keep your oracle running longer you should increase the oracleTtlValue and/or set up a service that automatically extends the TTL before it expires.',
  queryFee: 'Price for querying Oracle. QueryFee is optional and defaults to 30000',
}
