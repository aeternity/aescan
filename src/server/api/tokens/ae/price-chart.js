import cache from 'memory-cache'
import {
  CACHE_KEY_PRICE_DATA,
  MARKET_STATS_CACHE_TTL,
} from '@/utils/constants'

const SUPERHERO_API_URL = 'https://api.superhero.com/api'

const TIMEFRAME_TO_DAYS = {
  '1H': '1',
  '1D': '1',
  '1W': '7',
  '1M': '30',
  '1Y': '365',
  'MAX': 'max',
}

export default defineEventHandler(async (event) => {
  const { timeFrame: rawTimeFrame = 'MAX' } = getQuery(event)
  const timeFrame = Object.prototype.hasOwnProperty.call(TIMEFRAME_TO_DAYS, rawTimeFrame)
    ? rawTimeFrame
    : 'MAX'
  const days = TIMEFRAME_TO_DAYS[timeFrame]
  const cacheKey = `${CACHE_KEY_PRICE_DATA}-${timeFrame}`

  let result = cache.get(cacheKey)
  if (!result) {
    const allPrices = await $fetch(
      `${SUPERHERO_API_URL}/coins/aeternity/history?currency=usd&days=${days}`,
    )

    const prices = timeFrame === '1H'
      ? allPrices.filter(([ts]) => ts >= Date.now() - 60 * 60 * 1000)
      : allPrices

    result = {
      labels: prices.map(([ts]) => String(ts)),
      data: prices.map(([, price]) => price),
    }
    cache.put(cacheKey, result, MARKET_STATS_CACHE_TTL)
  }

  return result
})
