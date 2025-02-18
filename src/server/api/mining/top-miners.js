import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { limit } = getQuery(event)

  const url = getUrl({
    entity: 'stats/miners/top',
    limit: limit ?? 10,
    parameters: {
      interval_by: 'day',
      min_start_date: '2025-02-11',
      max_start_date: '2025-02-11',
      direction: 'forward',
    },
  })

  // const defaultParameters = `/stats/miners/top?interval_by=day&min_start_date=2025-02-11&max_start_date=2025-02-11&limit=${query.limit ?? 10}&direction=forward`
  const { data } = await axios.get(url)
  // todo different fetch function
  return data.data
})
