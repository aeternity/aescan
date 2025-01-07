import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'
// todo rename component
const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  if (query.queryParameters) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}${query.queryParameters}`)
    return data
  }

  const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v3/transactions`)
  transactionsUrl.searchParams.append('direction', 'backward')
  transactionsUrl.searchParams.append('limit', query.limit || 10)

  if (query.accountId) {
    transactionsUrl.searchParams.append('sender_id', query.accountId)
  }

  if (query.type) {
    transactionsUrl.searchParams.append('type', query.type)
  }
  const { data } = await axios.get(transactionsUrl)

  return adaptTransactions(data)
})

function adaptTransactions(transactions) {
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      createdHeight: transaction.blockHeight,
      created: DateTime.fromMillis(transaction.microTime).toLocaleString(DateTime.DATETIME_SHORT),
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
