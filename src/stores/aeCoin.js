import { defineStore } from 'pinia'
import cache from 'memory-cache'
import useAxios from '@/composables/useAxios'
import {
  CACHE_KEY_COINSTORE_MARKET_DATA,
  CACHE_KEY_COINW_MARKET_DATA,
  CACHE_KEY_GATE_MARKET_DATA,
  CACHE_KEY_HOTCOIN_MARKET_DATA,
  CACHE_KEY_MEXC_MARKET_DATA,
  MARKET_STATS_CACHE_TTL,
  MARKET_STATS_COINSTORE_ADDRESS,
  MARKET_STATS_HOTCOIN_ADDRESS,
} from '@/utils/constants'
import {
  adaptMarketStatsCoinStore,
  adaptMarketStatsCoinW,
  adaptMarketStatsGate,
  adaptMarketStatsHotCoin,
  adaptMarketStatsMexc,
} from '@/utils/adapters'

export const useAeCoinStore = defineStore('aeCoin', () => {
  const axios = useAxios()

  const gate = ref(null)
  const mexc = ref(null)
  const hotCoin = ref(null)
  const coinStore = ref(null)
  const coinW = ref(null)

  const isLoading = ref(true)

  function fetchMarketStats() {
    isLoading.value = true
    return Promise.allSettled([
      fetchGate(),
      fetchMexc(),
      fetchHotCoin(),
      fetchCoinStore(),
      fetchCoinW(),
    ]).then(() => {
      isLoading.value = false
    })
  }

  async function fetchGate() {
    if (!cache.get(CACHE_KEY_GATE_MARKET_DATA)) {
      const { data } = await axios.get('/proxy/gate')
      cache.put(CACHE_KEY_GATE_MARKET_DATA, adaptMarketStatsGate(data), MARKET_STATS_CACHE_TTL)
    }
    gate.value = cache.get(CACHE_KEY_GATE_MARKET_DATA)
  }

  async function fetchMexc() {
    if (!cache.get(CACHE_KEY_MEXC_MARKET_DATA)) {
      const { data } = await axios.get('/proxy/mexc')
      cache.put(CACHE_KEY_MEXC_MARKET_DATA, adaptMarketStatsMexc(data), MARKET_STATS_CACHE_TTL)
    }
    mexc.value = cache.get(CACHE_KEY_MEXC_MARKET_DATA)
  }

  async function fetchCoinStore() {
    if (!cache.get(CACHE_KEY_COINSTORE_MARKET_DATA)) {
      const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
      cache.put(CACHE_KEY_COINSTORE_MARKET_DATA, adaptMarketStatsCoinStore(data), MARKET_STATS_CACHE_TTL)
    }
    coinStore.value = cache.get(CACHE_KEY_COINSTORE_MARKET_DATA)
  }

  async function fetchHotCoin() {
    if (!cache.get(CACHE_KEY_HOTCOIN_MARKET_DATA)) {
      const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
      cache.put(CACHE_KEY_HOTCOIN_MARKET_DATA, adaptMarketStatsHotCoin(data), MARKET_STATS_CACHE_TTL)
    }
    hotCoin.value = cache.get(CACHE_KEY_HOTCOIN_MARKET_DATA)
  }

  async function fetchCoinW() {
    if (!cache.get(CACHE_KEY_COINW_MARKET_DATA)) {
      const { data } = await axios.get('/proxy/coinw')
      console.log('data', data)
      cache.put(CACHE_KEY_COINW_MARKET_DATA, adaptMarketStatsCoinW(data), MARKET_STATS_CACHE_TTL)
    }
    coinW.value = cache.get(CACHE_KEY_COINW_MARKET_DATA)
    console.log('coinW.value', coinW.value)
  }

  return {
    gate,
    mexc,
    hotCoin,
    coinStore,
    coinW,
    isLoading,
    fetchMarketStats,
  }
})
