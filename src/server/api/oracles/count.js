import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = getUrl({
    entity: 'stats',
    route: 'total',
    parameters: { limit: 1 },
  })

  const { data } = await axios.get(url)
  return data.data[0][`${query.state}Oracles`]
})
