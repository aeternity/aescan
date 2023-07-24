export const transactionsHints = {
  hash: 'Unique identifier of the transaction.',
  created: 'Keyblock height and exact date and time when the transaction has been executed by inclusion into a microblock.',
  type: 'The type of the transaction depends on its purpose in the æternity ecosystem.',
  data: 'The data displayed differs for each tx type.',
  spendTx: 'Transfers AE from one account to another.',
  contractCallTx: 'Executes a public function (aka entrypoint) of a deployed smart contract.',
  contractCreateTx: 'Deploys a new smart contract.',
  oracleRegisterTx: 'Registers an oracle for the account (oracle operator) that signed the transaction.',
  oracleQueryTx: 'An oracle can be queried by any account and requires the oracle fee to be provided. In case the oracle operator does not respond in time, the oracle fee will be returned.',
  oracleRespondTx: 'Response of the oracle operator to a specific query.',
  oracleExtendTx: 'Extends the lifetime of an existing oracle. This transaction type can only be executed by the oracle operator.',
  namePreclaimTx: 'In order to prevent frontrunning and undesired name squatting, a salt is hashed and provided to the blockchain in this transaction type. A name cannot be claimed without performing this transaction type first unless there is already an auction running for the name.',
  nameClaimTx: 'Claims a name directly (only if name length is > 12 chars), triggers a new name auction or places a higher bid on an existing auction. An additional name fee needs to be provided and the amount of AE required depends on the length of the name. The name fee will be burned with the activation of the name',
  nameUpdateTx: 'Can be used to extend the lifetime of a name and/or to update the pointers of a name. Extending the lifetime of a name is free and does not require any extra fee.',
  nameTransferTx: 'Transfers the ownership of a name to another account.',
  nameRevokeTx: 'Revokes the ownership of a name. After a fixed timeout of 2016 keyblocks, the Name will be available for claiming again.',
  channelCreateTx: 'Used by an initiator to open a state channel with a counterparty, the responder. Both participants agree on several conditions, for example the lock period which is important to prevent malicious behavior. This transaction is co-signed by the responder. The initiator covers the fee of this transaction.',
  channelDepositTx: 'Deposits funds into the channel. A participant moves coins from the participant\'s balance to the channel\'s one. ',
  channelWithdrawTx: 'Withdraws locked coins from a state channel.',
  channelCloseMutualTx: 'Closes a state channel by mutual agreement between the participants.',
  channelCloseSoloTx: 'A solo close has to be settled via a ChannelSettleTx after the lock period has passed. The lock period is being agreed upon when opening the channel.',
  channelSlashTx: 'If a malicious party sent a ChannelCloseSoloTx or ChannelForceProgressTx with an outdated state, the honest party has the opportunity to issue a ChannelSlashTx transaction.',
  channelSettleTx: 'The last transaction in the lifecycle of a channel, but only required if the parties involved did not manage to cooperate to close the channel. It has to be issued after all possible disputes are resolved and then redistribute the locked coins.',
  channelSnapshotSoloTx: 'Provides a snapshot of the recent off-chain state to be recorded on-chain in order to make channels both secure and trustless even when one party goes offline.',
  channelForceProgressTx: 'Unilaterally advances the state of a state channel.',
  gAAttachTx: 'Converts a regular, plain-old account into a generalized account by attaching a smart contract to it that has to implement a special function to authorize transactions.',
  gAMetaTx: 'This transaction type must be used in order to execute transactions for a generalized account where the authorization is handled by a smart contract. The actual transaction is wrapped and will only be executed if the provided auth data is valid according to the smart contract that verifies it.',
  payingForTx: 'Covers the fees for another user. It wraps any kind of other transaction types.',
  keyblockHeight: 'Keyblock height when the transaction was mined.',
  keyblockConfirmations: 'Amount of keyblocks that were added since the transaction was mined.',
  status: 'Status of the transaction.',
  microblockHash: 'Microblock in which the transaction is included.',
  fee: 'Fees paid for the transaction.',
  nonce: 'The nonce that has been used to execute this transaction. The nonce is used to prevent replay attacks and to keep transactions for a specific account in the right order. If a transaction with a way higher nonce is broadcasted, it won\'t be executed until all transactions with lower nonces are executed.',
  apiLinks: 'Links to sources of the transaction data.',
  sender: 'Account that sent AE coins.',
  recipient: 'Account that received AE coins.',
  amount: 'Amount of AE coins that were transferred.',
  payload: 'Additional message attached to the transaction.',
  gaAttachTxStatus: 'Status of the transaction.',
  gaAttachTxAccount: 'Account that was converted into a generalized account. The authorization logic of the account is now handled by the smart contract that was attached to the account.',
  gaAttachTxSmartContractId: 'Unique identifier of the smart contract that was attached to the account.',
  gaAttachTxGasLimit: 'Maximum amount of gas to be consumed by this transaction.',
  gaAttachTxAuthFunction: 'Name of the smart contract entrypoint that in the future handles the authorization logic of the account.',
  gaAttachTxArguments: 'Arguments that were passed to initialize the attached smart contract.',
  gaAttachTxGasPrice: 'Price for one unit of gas.',
  gaAttachTxGasUsed: 'Amount of gas that was consumed for attaching the smart contract to the account.',
  gaAttachTxGasCost: 'The amount of AE paid for attaching the smart contract to the account.',
}
