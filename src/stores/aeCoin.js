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
  const rawMarketstats = ref({})

  function fetchMarketStats() {
    rawMarketstats.value = {}
    return Promise.allSettled([
      fetchGate(),
      fetchMexc(),
      fetchHotcoin(),
      fetchCoinStore(),
      fetchCoinW(),
    ])
  }

  async function fetchGate() {
    try {
      const { data } = await axios.get('/proxy/gate')
      rawMarketstats.value.gate = adaptMarketStatsGate(data)
    } catch (e) {
      console.log('eee', e)
    }
  }

  async function fetchMexc() {
    try {
      const { data } = await axios.get('/proxy/mexc')
      rawMarketstats.value.mexc = adaptMarketStatsMexc(data)
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinStore() {
    try {
      const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
      rawMarketstats.value.coinStore = adaptMarketStatsCoinStore(data)
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchHotcoin() {
    try {
      const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
      rawMarketstats.value.hotCoin = adaptMarketStatsHotCoin(data)
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinW() {
    try {
      const { data } = await axios.get('/proxy/coinw')
      console.log('coinw data', data)
      rawMarketstats.value.coinW = adaptMarketStatsCoinW(data)
      console.log('rawMarketstats.value.coinW', rawMarketstats.value.coinW)
    } catch (e) {
      rawMarketstats.value.coinW = null
      // todo fix unavailable
    }
  }

  return {
    rawMarketstats,
    fetchMarketStats,
  }
})
