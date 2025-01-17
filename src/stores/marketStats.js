import { defineStore } from 'pinia'
import cache from 'memory-cache'
import useAxios from '@/composables/useAxios'
import {
  CACHE_KEY_COINGECKO_MARKET_DATA,
  CACHE_KEY_PRICE_DATA,
  MARKET_STATS_CACHE_TTL,
  MARKET_STATS_COINGECKO_ADDRESS,
  MAX_AE_DISTRIBUTION,
} from '@/utils/constants'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import useFeatureFlags from '@/composables/useFeatureFlags'

export const useMarketStatsStore = defineStore('marketStats', () => {
  const axios = useAxios()
  const price = ref(null)
  const priceChange = ref(null)
  const marketCap = ref(null)
  const isMarketCapAvailable = ref(null)

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
    if (!cache.get(CACHE_KEY_PRICE_DATA)) {
      try {
        const { data } = await axios.get(`${MARKET_STATS_COINGECKO_ADDRESS}/simple/price?ids=aeternity&vs_currencies=usd&include_24hr_change=true`)
        cache.put(CACHE_KEY_PRICE_DATA, data.aeternity, MARKET_STATS_CACHE_TTL)
        isMarketCapAvailable.value = true
      } catch (e) {
        isMarketCapAvailable.value = false
      }
    }

    const cachedAeternityPriceData = cache.get(CACHE_KEY_PRICE_DATA)
    price.value = cachedAeternityPriceData.usd
    priceChange.value = cachedAeternityPriceData.usd24hChange.toFixed(2)
  }

  async function fetchCoinStats() {
    if (!cache.get(CACHE_KEY_COINGECKO_MARKET_DATA)) {
      const { data } = await axios.get(`${MARKET_STATS_COINGECKO_ADDRESS}/coins/aeternity`)
      cache.put(CACHE_KEY_COINGECKO_MARKET_DATA, data.marketData, MARKET_STATS_CACHE_TTL)
    }

    const cachedAeternityMarketData = cache.get(CACHE_KEY_COINGECKO_MARKET_DATA)
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
