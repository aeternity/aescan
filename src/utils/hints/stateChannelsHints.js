export const stateChannelsHints = {
  stateChannelId: 'Unique identifier of the State Channel.',
  status: 'When status is "Open" transactions can be executed inside the State Channel, outside the blockchain network.',
  participants: 'The account that created and paid the fees to create the State Channel. Responder is the account that joined the State Channel.',
  onChainUpdates: 'Amount of on-chain transactions within the State Channel.',
  locked: 'Currently deposited amount to the State Channel by its participants.',
  lastUpdated: 'Block height and estimated date and time of the last interaction with the State Channel.',
  lastTxType: 'Type of the last transaction in the State Channel.',
  createTransaction: 'The transaction that created the State Channel.',
  initialAmount: 'The amount of tokens that were deposited to the State Channel by the initiator account.',
  initiator: 'The account that created and paid the fees to create the State Channel.',
  responder: 'The participating account that joined the State Channel.',
  lastKnownRound: 'Round is a value used to order various updates in the State Channel, which should be incremented with each off-chain update.',
}
