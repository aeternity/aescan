import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { microblockHash, limit, queryParameters } = getQuery(event)

  const [data, count] = await Promise.all([
    fetchTransactions(microblockHash, queryParameters, limit),
    fetchTransactionsCount(microblockHash),
  ])

  return adaptTransactions(data, count)
})

async function fetchTransactions(microblockHash, queryParameters, limit) {
  const url = getUrl({
    entity: 'micro-blocks',
    id: microblockHash,
    route: 'transactions',
    limit: limit ?? 10,
    queryParameters,
  })
  const { data } = await axios.get(url)
  return data
  // todo wire type
}

async function fetchTransactionsCount(id) {
  const url = getUrl({
    entity: 'transactions',
    route: 'count',
    parameters: {
      mb_hash: id,
      // type:null
    },
  })

  const { data } = await axios.get(url)
  return data.data
}

function adaptTransactions(transactions, count) {
  const formattedData = transactions.data.map(transaction => {
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
