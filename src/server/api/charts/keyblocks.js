import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()


export default defineEventHandler(async event => {
  // todo destruct params so i don need to query.something
  const query = getQuery(event)
  console.log('query', query)

  // todo concat string programatically
  const intervalSlug = query.customInterval
    ? `?min_start_date=${query.customInterval.minStart}&max_start_date=${query.customInterval.maxStart}&limit=1000`
    : `?interval_by=${query.interval}&limit=${parseInt(query.limit) + 1}`
  console.log('intervalSlug', intervalSlug)
  const url = new URL(`${MIDDLEWARE_URL}/v3/stats/blocks${intervalSlug}&type=key`)
  // todo do i have to use url?
  // console.log('url', url)

  const { data } = await axios.get(url)
  // console.log('data', data)
  return data
})

