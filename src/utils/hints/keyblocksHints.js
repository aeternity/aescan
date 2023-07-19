export const keyblocksHints = {
  keyblock: 'Unlike in Bitcoin, (key)blocks do not directly include any transaction. Instead, a mined keyblock determines a new leader who is then eligible to create new microblocks every 3 seconds which include the transactions. On average, a new keyblock is mined every 3 minutes.',
  height: 'Total number of keyblocks that have been added to the blockchain in a sequential order, starting from the genesis block. Each new block added to the chain increases the height by one.',
  time: 'Date and time when the keyblock was mined.',
  miner: 'The account that mined the keyblock.',
  mined: 'The exact moment when the keyblock was successfully added to the blockchain.',
  beneficiary: 'The miner who successfully added the keyblock to the blockchain and received a block reward.',
  beneficiaryReward: 'Amount that was paid to the miner who added the keyblock to the blockchain, as an incentive for their participation and contribution to the network.',
  briReward: 'A fraction of the keyblock reward that was granted to æternity crypto foundation to fund its activities.',
  hash: 'Unique identifier of the latest keyblock. It also serves as a reference point for subsequent keyblocks to be added to the blockchain.',
  microblockCount: 'Count of microblocks that the keyblock contains',
  transactionsCount: 'Count of transactions that the keyblock contains',
  apiLinks: 'Links to sources of the keyblock data.',
}
