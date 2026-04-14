import cache from 'memory-cache'
import {
  CACHE_KEY_PRICE_DATA,
  MARKET_STATS_CACHE_TTL,
} from '@/utils/constants'

const CACHE_KEY = `${CACHE_KEY_PRICE_DATA}-dex`

const SUPPORTED_TIMEFRAMES = new Set(['1H', '1D', '1W', '1M', '1Y', 'MAX'])

export default defineEventHandler(async (event) => {
  const { timeFrame: rawTimeFrame = 'MAX' } = getQuery(event)
  const timeFrame = SUPPORTED_TIMEFRAMES.has(rawTimeFrame) ? rawTimeFrame : 'MAX'
  const { DEX_BACKEND_URL, AE_TOKEN_ID } = useRuntimeConfig().public
  const cacheKey = `${CACHE_KEY}-${timeFrame}`

  if (!DEX_BACKEND_URL || !AE_TOKEN_ID) {
    return { labels: [], data: [] }
  }

  let result = cache.get(cacheKey)
  if (!result) {
    try {
      const url = new URL(`${DEX_BACKEND_URL}/graph`)
      url.searchParams.set('graphType', 'Price')
      url.searchParams.set('tokenAddress', AE_TOKEN_ID)
      url.searchParams.set('timeFrame', timeFrame)
      const response = await $fetch(url.toString())
      result = {
        labels: response.labels ?? [],
        data: (response.data ?? []).map(Number),
      }
    } catch {
      result = { labels: [], data: [] }
    }
    cache.put(cacheKey, result, MARKET_STATS_CACHE_TTL)
  }

  return result
})
