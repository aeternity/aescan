export const stateChannelsHints = {
  stateChannelId: 'Unique identifier of the State Channel.',
  status: 'When status is \'Open\' transactions can be executed inside the State Channel, outside the blockchain network',
  participants: 'Initiator is the account that created the State Channel via ChannelCreateTx.',
  onChainUpdates: 'Amount of off-chain transactions within the State Channel.',
  locked: 'Currently deposited amount to the State Channel by it\'s participants.',
  lastUpdated: 'Estimated date, time, and block height of the last interaction with the State Channel.',
  lastTxType: 'Last transaction\'s type of the State Channel.',
}
