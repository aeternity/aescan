import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { id, queryParameters, limit } = getQuery(event)

  const url = getUrl({
    entity: 'aex141',
    route: 'templates',
    id,
    queryParameters,
    limit,
  })

  const { data } = await axios.get(url)
  return data
})
