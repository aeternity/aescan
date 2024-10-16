import { DateTime } from 'luxon'

export function adaptTransactions(transactions) {
  console.log('transactions', transactions)
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      createdHeight: transaction.blockHeight,
      created: DateTime.fromMillis(transaction.microTime),
      type: transaction.tx.type,
      data: transaction.tx,
      hintKey: transaction.tx.type.charAt(0).toLowerCase() + transaction.tx.type.slice(1),
    }
  })
  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
  }
}
