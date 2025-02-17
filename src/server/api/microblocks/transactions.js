import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { microblockHash, limit, queryParameters, type } = getQuery(event)

  const [data, count] = await Promise.all([
    fetchTransactions(microblockHash, queryParameters, limit, type),
    fetchTransactionsCount(microblockHash, type),
  ])

  return adaptTransactions(data, count)
})

async function fetchTransactions(microblockHash, queryParameters, limit, type) {
  const url = getUrl({
    entity: 'micro-blocks',
    id: microblockHash,
    route: 'transactions',
    limit: limit ?? 10,
    parameters: {
      type,
    },
    queryParameters,
  })
  const { data } = await axios.get(url)
  return data
  // todo wire type
}

async function fetchTransactionsCount(id, type) {
  const url = getUrl({
    entity: 'transactions',
    route: 'count',
    parameters: {
      mb_hash: id,
      type,
    },
  })
  // https://mainnet.aeternity.io/mdw/v3/transactions/count?mb_hash=mh_2kNgGg4NTqrLqPyEfGm2Hsvz6BbymymvNxze332WEDVou9gf3W&type=name_claim

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
