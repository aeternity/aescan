import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { height, queryParameters, type, limit } = getQuery(event)

  const [data, count] = await Promise.all([
    fetchTransactions(height, queryParameters, type, limit),
    fetchTransactionsCount(height),
  ])

  return adaptTransactions(data, count)
})

async function fetchTransactions(height, queryParameters, type, limit) {
  const url = getUrl({
    entity: 'transactions',
    parameters: {
      type,
      scope: `gen:${height}-${height}`,
    },
    queryParameters,
    limit,
  })
  const { data } = await axios.get(url)
  return data
}

async function fetchTransactionsCount(height) {
  const url = getUrl({
    entity: 'transactions',
    route: 'count',
    parameters: {
      scope: `gen:${height}-${height}`,
    },
  })
  const { data } = await axios.get(url)
  return data.data
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
