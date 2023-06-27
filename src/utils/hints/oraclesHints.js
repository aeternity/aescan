export const oraclesHints = {
  oracleId: 'Unique oracle identifier inherited from the account address of the operator.',
  registered: 'Keyblock height and exact date when the oracle has been registered via OracleRegisterTx.',
  expiration: 'The default lifetime of an oracle is 500 keyblocks. The initial lifetime can be set to a higher value and an oracle can be extended anytime, e.g. by setting up an automated service. In case the oracle lifetime is passed, the oracle operator can re-register it anytime.',
  queryFee: 'The default fee required to query an oracle is 30,000 aettos and is defined by the oracle operator when registering it. The oracle operator can set it to any value and even allow to query the oracle for free.',
  lastExtended: 'Keyblock height and estimated date when the oracle has been extended.',
  lastQueried: 'Keyblock height and exact date of the last query to the oracle.',
  queryFormat: 'Format of the oracle query defined during the registration of the oracle.',
  responseFormat: 'Format of the oracle response defined during the registration of the oracle.',
  oracleOperator: 'The account that operates the oracle.',
  queryTx: 'Transaction hash of the oracle query.',
  queryStatus: 'Status of the oracle query that can be expanded to see the details.',
  respondTx: 'Transaction hash of the oracle response.',
  queryId: 'Unique identifier of the oracle query.',
  queryContent: 'The actual subject of the OracleQueryTx that an oracle operator requests in order to respond.',
  responseTtl: 'Defines how long the response will be accessible in keyblocks. The displayed lifetime is relative and if a smart contract relies on the response, the user or a service should make sure the response is consumed during its lifetime.',
  response: 'The response payload to the given query.',
  sender: 'Account that queried the oracle.',
  queryTtl: 'Defines the lifetime of an oracle query in keyblocks. The oracle operator can only respond as long as the query is valid..',
  oracleTtl: 'Defines how long the oracle will be accessible in keyblocks.',
}
