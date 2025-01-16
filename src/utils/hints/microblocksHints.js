export const microblocksHints = {
  microblockId: 'Unique identifier of the microblock',
  microblock: 'Microblocks can be created every 3 seconds by the current leader, are linked to a specific keyblock, and include all types of on-chain transactions. The next leader is incentivized to keep the microblocks in the blockchain as he receives 40% of the fees of the transactions.',
  keyblock: 'Parent keyblock id to which the microblock is linked.',
  microblockHeight: 'Parent keyblock height to which the microblock is linked.',
  time: 'Date and time when the microblock has been mined.',
  transactionsCount: 'Number of transactions in the microblock.',
  apiLinks: 'Links to sources of the microblock data.',
  transactionHash: 'Unique identifier of the transaction.',
  transactionTime: 'Keyblock height and exact date and time when the transaction was executed by inclusion into a microblock.',
  transactionType: 'The type of the transaction depends on its purpose in the æternity ecosystem.',
  transactionData: 'The data displayed differs for each tx type.',
  gas: 'Used gas from all transactions in the microblock.',
}
