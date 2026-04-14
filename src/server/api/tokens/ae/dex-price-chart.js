import cache from 'memory-cache'
import {
  CACHE_KEY_PRICE_DATA,
  MARKET_STATS_CACHE_TTL,
} from '@/utils/constants'

const CACHE_KEY = `${CACHE_KEY_PRICE_DATA}-dex`

export default defineEventHandler(async (event) => {
  const { timeFrame = 'MAX' } = getQuery(event)
  const { DEX_BACKEND_URL, AE_TOKEN_ID } = useRuntimeConfig().public
  const cacheKey = `${CACHE_KEY}-${timeFrame}`

  if (!DEX_BACKEND_URL || !AE_TOKEN_ID) {
    return { labels: [], data: [] }
  }

  let result = cache.get(cacheKey)
  if (!result) {
    try {
      const response = await $fetch(
        `${DEX_BACKEND_URL}/graph?graphType=Price&tokenAddress=${AE_TOKEN_ID}&timeFrame=${timeFrame}`,
      )
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
