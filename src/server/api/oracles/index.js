import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { queryParameters, state, limit } = getQuery(event)

  const url = getUrl({
    entity: 'oracles',
    parameters: { state },
    limit: limit ?? 10,
    queryParameters,
  })

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
