import { defineStore } from 'pinia'
import axios from 'axios'
import cache from 'memory-cache'
import {
  MARKET_STATS_ADDRESS,
  MAX_AE_DISTRIBUTION,
  MARKET_STATS_CACHE_TTL,
  CACHE_KEY_MARKET_DATA,
  CACHE_KEY_PRICE_DATA,
} from '@/utils/constants'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'

export const useMarketStatsStore = defineStore('marketStats', () => {
  const price = ref(null)
  const priceChange = ref(null)
  const marketCap = ref(null)
  const circulatingSupply = ref(null)

  const blockchainStatsStore = useBlockchainStatsStore()

  const distribution = computed(() =>
    circulatingSupply.value && blockchainStatsStore.burnedCount ? circulatingSupply.value + Number(blockchainStatsStore.burnedCount) : null,
  )

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
    let cachedAeternityPriceData = cache.get(CACHE_KEY_PRICE_DATA)

    if (!cachedAeternityPriceData) {
      const { data } = await axios.get(`${MARKET_STATS_ADDRESS}/simple/price?ids=aeternity&vs_currencies=usd&include_24hr_change=true`)
      cache.put(CACHE_KEY_PRICE_DATA, data.aeternity, MARKET_STATS_CACHE_TTL)
      cachedAeternityPriceData = data.aeternity
    }

    price.value = cachedAeternityPriceData.usd
    priceChange.value = cachedAeternityPriceData.usd_24h_change.toFixed(2)
  }

  async function fetchCoinStats() {
    let cachedAeternityMarketData = cache.get(CACHE_KEY_MARKET_DATA)

    if (!cachedAeternityMarketData) {
      const { data } = await axios.get(`${MARKET_STATS_ADDRESS}/coins/aeternity`)
      cache.put(CACHE_KEY_MARKET_DATA, data.market_data, MARKET_STATS_CACHE_TTL)
      cachedAeternityMarketData = data.market_data
    }

    marketCap.value = cachedAeternityMarketData.market_cap.usd
    circulatingSupply.value = cachedAeternityMarketData.circulating_supply
  }

  return {
    fetchMarketStats,
    price,
    priceChange,
    marketCap,
    circulatingSupply,
    distribution,
    distributionPercentage,
  }
})
