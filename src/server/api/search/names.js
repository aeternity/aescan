import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { query, limit, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'names',
    parameters: { prefix: query, by: 'name' },
    limit: limit ?? 10,
    queryParameters,
  })

  const { data } = await axios.get(url)
  return data
})
