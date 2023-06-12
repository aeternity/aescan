export const oraclesHints = {
  oracleId: 'Unique Oracle identifier inherited from the account address of the creator.',
  oracleRegistered: 'Block height and estimated date when the Oracle has been registered via OracleRegisterTx.',
  oracleExpiration: 'By default the Oracle will exist for the next 500 keyblocks. To keep an Oracle running longer the oracleTtl value, it should be increased and/or set up a service that automatically extends the TTL before it expires.',
  queryFee: 'Fee for querying an Oracle. QueryFee is optional and defaults to 30000 aettos.',
  lastExtended: 'Block height and estimated date when the Oracle has been extended.',
  lastQuery: 'Block height and estimated date when when the Oracle has been queried.',
  queryFormat: 'Query format describes the format of the Oracle queries.',
  responseFormat: 'Response format describes the format of the Oracle responses.',
  oracleCreator: 'The account that created the Oracle.',
  queryTx: 'Transaction hash of the Oracle query.',
  queryStatus: 'Status indicates the progress in processing the Oracle query.',
  respondTx: 'Transaction hash of the Oracle response.',
  queryId: 'Unique identifier of the Oracle query.',
  queryContent: 'The query is the actual subject of the Query transaction that was sent to the Oracle.',
  responseTtl: 'The response TTL decides how long the response is available when given from the Oracle. The response TTL is always relative. This is to not give incentive to the oracle to post the answer late, since the oracle is paying the fee for the response.',
  response: 'Response is the result of the Oracle query in binary format.',
}
