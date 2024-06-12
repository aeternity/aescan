import { defineStore } from 'pinia'
import cache from 'memory-cache'
import useAxios from '@/composables/useAxios'
import { MARKET_STATS_CACHE_TTL, MARKET_STATS_COINSTORE_ADDRESS, MARKET_STATS_HOTCOIN_ADDRESS } from '~/utils/constants'
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
    if (!cache.get('gate-market-data')) {
      const { data } = await axios.get('/proxy/gate')
      cache.put('gate-market-data', adaptMarketStatsGate(data), MARKET_STATS_CACHE_TTL)
    }
    gate.value = cache.get('gate-market-data')
  }

  async function fetchMexc() {
    if (!cache.get('mexc-market-data')) {
      const { data } = await axios.get('/proxy/mexc')
      cache.put('mexc-market-data', adaptMarketStatsMexc(data), MARKET_STATS_CACHE_TTL)
    }
    mexc.value = cache.get('mexc-market-data')
  }

  async function fetchCoinStore() {
    if (!cache.get('coinStore-market-data')) {
      const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
      cache.put('coinStore-market-data', adaptMarketStatsCoinStore(data), MARKET_STATS_CACHE_TTL)
    }
    coinStore.value = cache.get('coinStore-market-data')
  }

  async function fetchHotCoin() {
    if (!cache.get('hotCoin-market-data')) {
      const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
      cache.put('hotCoin-market-data', adaptMarketStatsHotCoin(data), MARKET_STATS_CACHE_TTL)
    }
    hotCoin.value = cache.get('hotCoin-market-data')
  }

  async function fetchCoinW() {
    if (!cache.get('coinW-market-data')) {
      const { data } = await axios.get('/proxy/coinw')
      cache.put('coinW-market-data', adaptMarketStatsCoinW(data), MARKET_STATS_CACHE_TTL)
    }
    coinW.value = cache.get('coinW-market-data')
  }

  // todo move everything to the store
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
