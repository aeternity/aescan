import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { query, limit, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'aex141',
    parameters: { prefix: query, direction: 'forward' },
    limit: limit ?? 10,
    queryParameters,
  })

  const { data } = await axios.get(url)

  return data
})
