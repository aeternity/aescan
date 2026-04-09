import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { query, queryParameters, limit } = getQuery(event)

  const url = getUrl({
    entity: 'names',
    parameters: { prefix: query, by: 'name' },
    queryParameters,
    limit,
  })

  const { data } = await axios.get(url)
  return data
})
