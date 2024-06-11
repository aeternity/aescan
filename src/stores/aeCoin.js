import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { MARKET_STATS_COINSTORE_ADDRESS, MARKET_STATS_HOTCOIN_ADDRESS } from '~/utils/constants'
import {
  adaptMarketStatsCoinStore,
  adaptMarketStatsCoinW,
  adaptMarketStatsGate,
  adaptMarketStatsHotCoin,
  adaptMarketStatsMexc,
} from '@/utils/adapters'

export const useAeCoinStore = defineStore('aeCoin', () => {
  const axios = useAxios()
  const aeCoinMarketStats = ref({})

  function fetchMarketStats() {
    aeCoinMarketStats.value = {
      gate: null,
      mexc: null,
      coinStore: null,
      hotCoin: null,
      coinW: null,
    }
    // todo default like this?
    return Promise.allSettled([
      fetchGate(),
      fetchMexc(),
      fetchHotcoin(),
      fetchCoinStore(),
      fetchCoinW(),
    ])
  }

  async function fetchGate() {
    const { data } = await axios.get('/proxy/gate')
    aeCoinMarketStats.value.gate = adaptMarketStatsGate(data)
  }

  async function fetchMexc() {
    const { data } = await axios.get('/proxy/mexc')
    aeCoinMarketStats.value.mexc = adaptMarketStatsMexc(data)
  }

  async function fetchCoinStore() {
    const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
    aeCoinMarketStats.value.coinStore = adaptMarketStatsCoinStore(data)
  }

  async function fetchHotcoin() {
    const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
    aeCoinMarketStats.value.hotCoin = adaptMarketStatsHotCoin(data)
  }

  async function fetchCoinW() {
    const data = await axios.get('/proxy/coinw')
    console.log('data', data)
    aeCoinMarketStats.value.coinW = adaptMarketStatsCoinW(data)
  }

  // todo move everything to the store
  // todo caching
  return {
    aeCoinMarketStats,
    fetchMarketStats,
  }
})
