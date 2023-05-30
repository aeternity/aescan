import { defineStore } from 'pinia'
import axios from 'axios'
import cache from 'memory-cache'
import {
  CACHE_KEY_MARKET_DATA,
  CACHE_KEY_PRICE_DATA,
  MARKET_STATS_ADDRESS,
  MARKET_STATS_CACHE_TTL,
  MAX_AE_DISTRIBUTION,
} from '@/utils/constants'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'

export const useMarketStatsStore = defineStore('marketStats', () => {
  const price = ref(null)
  const priceChange = ref(null)
  const marketCap = ref(null)

  const blockchainStatsStore = useBlockchainStatsStore()

  const distribution = computed(() => Number(blockchainStatsStore.totalTokenSupply))

  const distributionPercentage = computed(() =>
    distribution.value ? (distribution.value / MAX_AE_DISTRIBUTION * 100).toFixed(2) : null,
  )

  function fetchMarketStats() {
    return Promise.all([
      fetchPrice(),
      fetchCoinStats(),
    ])
  }

  async function fetchPrice() {
    if (!cache.get(CACHE_KEY_PRICE_DATA)) {
      const { data } = await axios.get(`${MARKET_STATS_ADDRESS}/simple/price?ids=aeternity&vs_currencies=usd&include_24hr_change=true`)
      cache.put(CACHE_KEY_PRICE_DATA, data.aeternity, MARKET_STATS_CACHE_TTL)
    }

    const cachedAeternityPriceData = cache.get(CACHE_KEY_PRICE_DATA)
    price.value = cachedAeternityPriceData.usd
    priceChange.value = cachedAeternityPriceData.usd_24h_change.toFixed(2)
  }

  async function fetchCoinStats() {
    if (!cache.get(CACHE_KEY_MARKET_DATA)) {
      const { data } = await axios.get(`${MARKET_STATS_ADDRESS}/coins/aeternity`)
      cache.put(CACHE_KEY_MARKET_DATA, data.market_data, MARKET_STATS_CACHE_TTL)
    }

    const cachedAeternityMarketData = cache.get(CACHE_KEY_MARKET_DATA)
    marketCap.value = cachedAeternityMarketData.market_cap.usd
  }

  return {
    fetchMarketStats,
    price,
    priceChange,
    marketCap,
    distribution,
    distributionPercentage,
  }
})
