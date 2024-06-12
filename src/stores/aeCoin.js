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

  const gate = ref(null)
  const mexc = ref(null)
  const hotCoin = ref(null)
  const coinStore = ref(null)
  const coinW = ref(null)

  function fetchMarketStats() {
    return Promise.allSettled([
      fetchGate(),
      fetchMexc(),
      fetchHotCoin(),
      fetchCoinStore(),
      fetchCoinW(),
    ])
  }

  async function fetchGate() {
    const { data } = await axios.get('/proxy/gate')
    console.log('fetchGate', data)
    gate.value = adaptMarketStatsGate(data)
  }

  async function fetchMexc() {
    const { data } = await axios.get('/proxy/mexc')
    mexc.value = adaptMarketStatsMexc(data)
  }

  async function fetchCoinStore() {
    const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
    coinStore.value = adaptMarketStatsCoinStore(data)
  }

  async function fetchHotCoin() {
    const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
    hotCoin.value = adaptMarketStatsHotCoin(data)
  }

  async function fetchCoinW() {
    const { data } = await axios.get('/proxy/coinw')
    coinW.value = adaptMarketStatsCoinW(data)
  }

  // todo move everything to the store
  // todo caching
  return {
    gate,
    mexc,
    hotCoin,
    coinStore,
    coinW,
    fetchMarketStats,
  }
})
