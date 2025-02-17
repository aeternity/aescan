import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  console.log('query', query)
  const defaultParameters = `/stats/miners/top?interval_by=day&min_start_date=2025-02-11&max_start_date=2025-02-11&${query.limit ?? 10}direction=forward`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  console.log('url.href', url.href)
  const { data } = await axios.get(url)
  // todo different fetch function
  console.log('data', data)
  return data.data
})
