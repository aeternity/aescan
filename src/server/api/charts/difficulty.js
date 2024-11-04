import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const {interval, limit, customInterval} = getQuery(event)
  const intervalSlug = customInterval
    ? `?min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=1000`
    : `?interval_by=${interval}&limit=${parseInt(limit)}`
  // todo limit + 1?????
  const url = new URL(`${MIDDLEWARE_URL}/v3/stats/difficulty${intervalSlug}`)
  const { data } = await axios.get(url)
  return data
})

