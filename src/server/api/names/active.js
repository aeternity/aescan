import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'names',
    parameters: { state: 'active', by: 'deactivation', direction: 'forward' },
    queryParameters,
  })
  const { data } = await axios.get(url)
  return adaptActiveNames(data)
})

function adaptActiveNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    buyer: name.ownership.original,
    owner: name.ownership.current,
    fee: formatAettosToAe(name.nameFee),
    expiration: name.approximateExpireTime,
    expirationHeight: name.expireHeight,
    pointers: Object.values(name.pointers),
  }))

  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}
