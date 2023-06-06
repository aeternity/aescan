export const oraclesHints = {
  oracleId: 'Unique Oracle identifier inherited from the account address of the creator.',
  oracleRegistered: 'Estimated date, time, and block height when the Oracle has been registered via OracleRegisterTx.',
  oracleExpiration: 'By default the Oracle will exist for the next 500 keyblocks. To keep an Oracle running longer the oracleTtl value, it should be increased and/or set up a service that automatically extends the TTL before it expires.',
  queryFee: 'Fee for querying an Oracle. QueryFee is optional and defaults to 30000 aettos.',
  lastExtended: 'Estimated date, time, and block height when the Oracle has been extended.',
  lastQuery: 'Estimated date, time, and block height when the Oracle has been queried.',
  queryFormat: 'Query format describes the format of the Oracle queries.',
  responseFormat: 'Response format describes the format of the Oracle responses.',
  oracleCreator: 'Account address of the Oracle creator.',
  queryTx: 'Transaction hash of the Oracle query.',
  queryStatus: 'Status indicates the progress in processing of the Oracle query.',
  respondTx: 'Transaction hash of the Oracle response.',
}
