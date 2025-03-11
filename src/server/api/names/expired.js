import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'names',
    parameters: { state: 'inactive' },
    queryParameters,
  })

  const { data } = await axios.get(url)
  return adaptExpiredNames(data)
})

function adaptExpiredNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    expirationHeight: name.expireHeight,
    expiration: name.approximateExpireTime,
    fee: formatAettosToAe(name.nameFee),
    lastBuyer: name.ownership.original,
    lastOwner: name.ownership.current,
  }))
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}
