import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const defaultParameters = `/v3/names?prefix=${query.query}&limit=${query.limit ?? 10}&by=name`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return data
})


