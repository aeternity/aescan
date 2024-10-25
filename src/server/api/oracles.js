import useAxios from '@/composables/useAxios'
import { DateTime } from "luxon";
import { formatAettosToAe } from "~/utils/format";

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = new URL(`${MIDDLEWARE_URL}/v3/oracles`)

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  const { data } = await axios.get(url)
  return adaptOracles(data)
})

function adaptOracles(oracles) {
  const formattedData = oracles.data.map(oracle => {
    return {
      id: oracle.oracle,
      registeredHeight: oracle.activeFrom,
      registered: DateTime.fromMillis(oracle.registerTime).toLocaleString(DateTime.DATETIME_SHORT),
      expirationHeight: oracle.expireHeight,
      expiration: DateTime.fromMillis(oracle.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT),
      queryFee: formatAettosToAe(oracle.queryFee),
    }
  })
  return {
    next: oracles.next,
    data: formattedData,
    prev: oracles.prev,
  }
}
