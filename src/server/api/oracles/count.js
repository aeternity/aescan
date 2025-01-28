import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = new URL(`${MIDDLEWARE_URL}/stats/total?limit=1`)
  const { data } = await axios.get(url)
  return data.data[0][`${query.state}Oracles`]
})
