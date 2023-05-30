export const oraclesHints = {
  oracleId: 'Unique Oracle identifier inherited from the account address of the creator.',
  oracleRegistered: 'Date, time, and block height when the Oracle has been registered via OracleRegisterTx.',
  oracleExpiration: 'By default the Oracle will exist for the next 500 Keyblocks. To keep an Oracle running longer the oracleTtlValue should be increased and/or set up a service that automatically extends the TTL before it expires.',
  queryFee: 'Fee for querying an Oracle. QueryFee is optional and defaults to 30000 aettos',
}
