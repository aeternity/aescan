import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/stats/miners?limit=${query.limit ?? 10}`
  const { data } = await axios.get(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)

  return data
})
