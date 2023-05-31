export const stateChannelsHints = {
  stateChannelId: 'Unique identifier of the State Channel.',
  status: 'State Channel can be Open or Closed. When status is Open the transactions lies outside of the blockchain network.',
  participants: 'Initiator is an account that created the State Channel via ChannelCreateTx. Responder is an account that interacted with the State Channel as a last one.',
  onChainUpdates: 'Amount of an off-chain transactions within the State Channel.',
  locked: 'Currently deposited amount to the State Channel by it\'s participants.',
  lastKnownRound: '',
  lastUpdated: 'Estimated date, time, and block height of the last interaction within the State Channel.',
  lastTxType: 'Last transaction\'s type of the State Channel.',
}
