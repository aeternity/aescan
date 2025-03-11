import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { query, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'names',
    parameters: { prefix: query, by: 'name' },
    queryParameters,
  })

  const { data } = await axios.get(url)
  return data
})
