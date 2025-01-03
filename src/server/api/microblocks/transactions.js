import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/v3/micro-blocks/${query.microblockHash}/transactions?limit=${query.limit ?? 10}`

  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return adaptTransactions(data)
})

export function adaptTransactions(transactions) {
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      createdHeight: transaction.blockHeight,
      created: DateTime.fromMillis(transaction.microTime).toLocaleString(DateTime.DATETIME_SHORT),
      type: transaction.tx.type,
      data: transaction.tx,
      hintKey: transaction.tx.type.charAt(0).toLowerCase() + transaction.tx.type.slice(1),
    }
    // todo this is reused
  })
  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
  }
}
