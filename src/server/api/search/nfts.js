import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/v3/aex141?prefix=${query.query}&limit=${query.limit ?? 10}&direction=forward`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return data
})


