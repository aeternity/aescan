import cache from 'memory-cache'
import {
  CACHE_KEY_COINGECKO_MARKET_DATA,
  CACHE_KEY_COINGECKO_MARKET_DATA_FAILED,
  CACHE_KEY_PRICE_DATA,
  CACHE_KEY_PRICE_DATA_FAILED,
  MARKET_STATS_CACHE_TTL,
  MARKET_STATS_COINGECKO_ADDRESS,
  MARKET_STATS_FAILURE_BACKOFF_TTL,
  MAX_AE_DISTRIBUTION,
} from '@/utils/constants'

export const useMarketStatsStore = defineStore('marketStats', () => {
  const axios = useAxios()
  const { COINGECKO_API_KEY } = useRuntimeConfig()
  // CoinGecko's Demo API plan expects the key on this header. When unset, we
  // fall back to the public, more aggressively rate-limited tier.
  const coingeckoRequestConfig = COINGECKO_API_KEY
    ? { headers: { 'x-cg-demo-api-key': COINGECKO_API_KEY } }
    : {}
  const price = ref(null)
  const priceChange = ref(null)
  const marketCap = ref(null)
  const isPriceAvailable = ref(null)
  const isMarketCapDataAvailable = ref(null)
  const isMarketCapAvailable = computed(() => {
    if (isPriceAvailable.value === null && isMarketCapDataAvailable.value === null) {
      return null
    }
    return isPriceAvailable.value !== false && isMarketCapDataAvailable.value !== false
  })

  const blockchainStatsStore = useBlockchainStatsStore()
  const featureFlags = useFeatureFlags()

  const distribution = computed(() =>
    blockchainStatsStore.totalTokenSupply && blockchainStatsStore.burnedCount
      ? Number(blockchainStatsStore.totalTokenSupply) + Number(blockchainStatsStore.burnedCount)
      : null,
  )

  const distributionPercentage = computed(() => {
    return distribution.value ? (distribution.value / MAX_AE_DISTRIBUTION * 100).toFixed(2) : null
  },
  )

  function fetchMarketStats() {
    if (!featureFlags.marketStats) {
      return
    }

    return Promise.all([
      fetchPrice(),
      fetchCoinStats(),
    ])
  }

  async function fetchPrice() {
    if (!cache.get(CACHE_KEY_PRICE_DATA) && !cache.get(CACHE_KEY_PRICE_DATA_FAILED)) {
      try {
        const { data } = await axios.get(`${MARKET_STATS_COINGECKO_ADDRESS}/simple/price?ids=aeternity&vs_currencies=usd&include_24hr_change=true`, coingeckoRequestConfig)
        cache.put(CACHE_KEY_PRICE_DATA, data.aeternity, MARKET_STATS_CACHE_TTL)
        isPriceAvailable.value = true
      } catch (error) {
        console.error(error)
        // Back off for a short period so a CoinGecko outage/rate-limit doesn't
        // cause every subsequent SSR request to immediately retry (and amplify
        // the throttling further).
        cache.put(CACHE_KEY_PRICE_DATA_FAILED, true, MARKET_STATS_FAILURE_BACKOFF_TTL)
        isPriceAvailable.value = false
      }
    }

    const cachedAeternityPriceData = cache.get(CACHE_KEY_PRICE_DATA)
    if (!cachedAeternityPriceData) {
      return
    }
    price.value = cachedAeternityPriceData.usd
    priceChange.value = cachedAeternityPriceData.usd24hChange.toFixed(2)
  }

  async function fetchCoinStats() {
    if (!cache.get(CACHE_KEY_COINGECKO_MARKET_DATA) && !cache.get(CACHE_KEY_COINGECKO_MARKET_DATA_FAILED)) {
      try {
        const { data } = await axios.get(`${MARKET_STATS_COINGECKO_ADDRESS}/coins/aeternity`, coingeckoRequestConfig)
        cache.put(CACHE_KEY_COINGECKO_MARKET_DATA, data.marketData, MARKET_STATS_CACHE_TTL)
        isMarketCapDataAvailable.value = true
      } catch (error) {
        console.error(error)
        cache.put(CACHE_KEY_COINGECKO_MARKET_DATA_FAILED, true, MARKET_STATS_FAILURE_BACKOFF_TTL)
        isMarketCapDataAvailable.value = false
      }
    }

    const cachedAeternityMarketData = cache.get(CACHE_KEY_COINGECKO_MARKET_DATA)
    if (!cachedAeternityMarketData) {
      return
    }
    marketCap.value = cachedAeternityMarketData.marketCap.usd
  }

  return {
    fetchMarketStats,
    price,
    priceChange,
    marketCap,
    distribution,
    distributionPercentage,
    isMarketCapAvailable,
  }
})
