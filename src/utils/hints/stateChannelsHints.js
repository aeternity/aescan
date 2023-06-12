export const stateChannelsHints = {
  stateChannelId: 'Unique identifier of the State Channel.',
  status: 'When status is "Open" transactions can be executed inside the State Channel, outside the blockchain network.',
  participants: 'Initiator is the account that created the State Channel via ChannelCreateTx.',
  onChainUpdates: 'Amount of on-chain transactions within the State Channel.',
  locked: 'Currently deposited amount to the State Channel by its participants.',
  lastUpdated: 'Estimated date, time, and block height of the last interaction with the State Channel.',
  lastTxType: 'Last transaction\'s type of the State Channel.',
  
  createTransaction: 'Create transaction refers to the transaction that initialized the State Channel.',
  initialAmount: 'The amount of tokens that were deposited to the State Channel by the initiator account.',
  initiator: 'The account that created the State Channel.',
  responder: 'Responder is the participant account that joined the State Channel.',
  onChainUpdates: 'The number of on-chain transactions performed within the State Channel.',
  lastKnownRound: 'Round is a value used to order different channel states. The greater the value, the more recent the state is.',
}
