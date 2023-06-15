export const transactionsHints = {
  hash: 'Unique identifier of the transaction.',
  created: 'Block height and estimated date and time when the transaction was sent.',
  type: 'The type of the transaction depends on its purpose in the æternity ecosystem.',
  spendTx: 'Transfer AE from one account to another.',
  contractCallTx: 'Executes a function call of a deployed Smart Contract.',
  contractCreateTx: 'Deploys a new Smart Contract.',
  oracleRegisterTx: 'Registers an existing account as the Oracle.',
  oracleQueryTx: 'Queries an Oracle.',
  oracleRespondTx: 'The Oracle operator responds to a query by posting an Oracle response transaction.',
  oracleExtendTx: 'Extends the TTL of an existing Oracle by the Oracle operator.',
  namePreclaimTx: 'Starts the Name claiming process.',
  nameClaimTx: 'Claims the Name. It locks additional fees in a restricted account apart from the standard transaction fee.',
  nameUpdateTx: 'Extends the TTL of the Name and updates pointers.',
  nameTransferTx: 'Transfers the Name ownership.',
  nameRevokeTx: 'Revokes the ownership of a name. After a fixed timeout of 2016 blocks, the Name will be available for claiming again.',
  channelCreateTx: 'Creates a new State Channel on-chain.',
  channelDepositTx: 'Deposits funds into the channel. A participant moves coins from the participant\'s balance to the channel\'s one. ',
  channelWithdrawTx: 'Withdraws locked coins from a State Channel.',
  channelCloseMutualTx: 'Closes a state channel by mutual agreement between the participants.',
  channelCloseSoloTx: 'Closes a State Channel unilaterally. This is only necessary if one peer stops responding or cooperating but can also be used by a malicious peer trying to close a channel with a state that hasn\'t been agreed on by all participants.',
  channelSlashTx: 'If a malicious party sent a ChannelCloseSoloTx or ChannelForceProgressTx with an outdated state, the honest party has the opportunity to issue a ChannelSlashTx transaction.',
  channelSettleTx: 'The last transaction in the lifecycle of a channel, but only required if the parties involved did not manage to cooperate to close the channel. It has to be issued after all possible disputes are resolved and then redistribute the locked coins.',
  channelSnapshotSoloTx: 'Provides a snapshot of the recent off-chain state to be recorded on-chain in order to make channels both secure and trustless even when one party goes offline.',
  channelForceProgressTx: 'Unilaterally advances the state of a state channel.',
  gAAttachTx: 'Converts Plain Account into a Generalized Account by attaching code to it.',
  gAMetaTx: 'Wraps transaction data into a smart contract call. For a Generalized Account it wraps a "normal" transaction with "auth_data".',
  payingForTx: 'Covers the fees for another user. It wraps any kind of other transaction types.',
}
