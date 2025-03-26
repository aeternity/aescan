import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { id, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'aex141',
    route: 'tokens',
    id,
    queryParameters,
  })

  const { data } = await axios.get(url)
  return data
})
