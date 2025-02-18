import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { limit, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'stats/miners',
    limit: limit ?? 10,
    queryParameters,
  })

  const { data } = await axios.get(url)

  return data
})
