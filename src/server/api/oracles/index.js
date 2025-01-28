import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const defaultParameters = `/v3/oracles?state=${query.state}&limit=${query.limit || 10}`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)

  const { data } = await axios.get(url)
  return adaptOracles(data)
})

function adaptOracles(oracles) {
  const formattedData = oracles.data.map(oracle => {
    return {
      id: oracle.oracle,
      registeredHeight: oracle.activeFrom,
      registered: DateTime.fromMillis(oracle.registerTime)
        .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
      expirationHeight: oracle.expireHeight,
      expiration: DateTime.fromMillis(oracle.approximateExpireTime)
        .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
      queryFee: formatAettosToAe(oracle.queryFee),
    }
  })
  return {
    next: oracles.next,
    data: formattedData,
    prev: oracles.prev,
  }
}
