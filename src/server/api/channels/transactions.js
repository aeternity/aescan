import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { channel, direction, queryParameters } = getQuery(event)

  const [transactions, count] = await Promise.all([
    fetchStateChannelTransactions(channel, direction, queryParameters),
    fetchStateChannelTransactionsCount(channel),
  ])

  return adaptTransactions(transactions, count)
})

async function fetchStateChannelTransactions(channel, direction, queryParameters) {
  const url = getUrl({
    entity: 'transactions',
    parameters: { channel, direction },
    queryParameters,
  })
  const { data } = await axios.get(url)
  return data
}

async function fetchStateChannelTransactionsCount(id) {
  const url = getUrl({
    entity: 'transactions',
    route: 'count',
    parameters: { id },
  })
  const { data } = await axios.get(url)
  return data + 1
}

function adaptTransactions(transactions, count) {
  const formattedData = transactions.data.map((transaction) => {
    return {
      hash: transaction.hash,
      createdHeight: transaction.blockHeight,
      created: transaction.microTime,
      type: transaction.tx.type,
      data: transaction.tx,
      hintKey: transaction.tx.type.charAt(0).toLowerCase() + transaction.tx.type.slice(1),
    }
  })
  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
    count,
  }
}
