import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const defaultParameters = `/oracles?state=${query.state}&limit=${query.limit || 10}`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)

  const { data } = await axios.get(url)
  return adaptOracles(data)
})

function adaptOracles(oracles) {
  const formattedData = oracles.data.map(oracle => {
    return {
      id: oracle.oracle,
      registeredHeight: oracle.activeFrom,
      registered: oracle.registerTime,
      expirationHeight: oracle.expireHeight,
      expiration: oracle.approximateExpireTime,
      queryFee: formatAettosToAe(oracle.queryFee),
    }
  })
  return {
    next: oracles.next,
    data: formattedData,
    prev: oracles.prev,
  }
}
