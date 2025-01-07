import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'
// todo rename component
const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/v3/names?owned_by=${query.accountId}&by=name&direction=forward&state=active&limit=${query.limit || 10}`

  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return adaptAccountNames(data)
})

function adaptAccountNames(names) {
  const formattedData = names.data.map(name => {
    return {
      name: name.name,
      expirationHeight: name.expireHeight,
      expiration: DateTime.fromMillis(name.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT),
      pointers: name.pointers.map(pointer => pointer.id),
    }
  })
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}
