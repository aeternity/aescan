import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const url = getUrl({
    baseUrl: 'names',
    parameters: { prefix: query.query, limit: query.limit ?? 10, by: 'name' },
    queryParameters: query.queryParameters,
  })

  const { data } = await axios.get(url)
  return data
})
