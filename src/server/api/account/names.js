import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'
// todo rename component
const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  console.log('query', query)
  console.log('limit', query.limit)
  const defaultParameters = `/v2/names?owned_by=${query.accountId}&by=name&direction=forward&state=active&limit=${query.limit || 10}`

  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  console.log('url', url)
  const { data } = await axios.get(url)
  console.log('data', data)
  return adaptAccountNames(data)
})

function adaptAccountNames(names) {
  const formattedData = names.data.map(name => {
    return {
      name: name.name,
      expirationHeight: name.info.expireHeight,
      expiration: DateTime.fromMillis(name.info.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT),
      pointers: Object.values(name.info.pointers),
    }
  })
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}
