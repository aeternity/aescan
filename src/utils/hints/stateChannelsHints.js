export const stateChannelsHints = {
  stateChannelId: 'Unique identifier of the State Channel.',
  status: 'While the status is "Open", the State Channel participants can execute an unlimited amount of transactions off-chain with instant finality. The status will be "Closed" if one of the participants executes either a "ChannelCloseMutualTx" or a "ChannelSettleTx"',
  participants: 'Initiator is the account that paid the fees to create the State Channel. Responder is the account that joined the State Channel.',
  onChainUpdates: 'Amount of on-chain transactions related to the State Channel. Participants can for example deposit to, withdraw from or provide a snapshot of the State Channel to the chain.',
  locked: 'Current amount of AE coins deposited to the State Channel by both participants. While the State Channel is open and no snapshot is provided to the chain, only the participants know who owns a specific amount of the deposited AE coins.',
  lastUpdated: 'Block height and estimated date and time of the last on-chain interaction with the State Channel.',
  lastTxType: 'Type of the last on-chain transaction related to the State Channel.',
  createTransaction: 'The transaction that created the State Channel.',
  initialAmount: 'The total amount of AE coins that have initially been deposited to the State Channel by initiator and responder combined.',
  initiator: 'The account that initiated the creation of the State Channel and covered the fees for its creation.',
  responder: 'The participating account that joined the State Channel.',
  lastKnownRound: 'Participants can for example protect themselves from being cheated on by providing a snapshot from the latest off-chain round to the chain.',
}
