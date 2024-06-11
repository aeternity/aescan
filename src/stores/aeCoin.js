import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { MARKET_STATS_COINSTORE_ADDRESS, MARKET_STATS_HOTCOIN_ADDRESS } from '~/utils/constants'

export const useAeCoinStore = defineStore('aeCoin', () => {
  const axios = useAxios()
  const coinW = ref(null)
  const rawMarketstats = ref({})

  function fetchMarketStats() {
    rawMarketstats.value = {}
    return Promise.allSettled([
      fetchGate(),
      fetchMexc(),
      fetchHotcoin(),
      fetchCoinstore(),
      fetchCoinW(),
    ])
  }

  async function fetchGate() {
    try {
      const { data } = await axios.get('/proxy/gate')
      rawMarketstats.value.gate = data[0]
    } catch (e) {
      console.log('eee', e)
    }
  }

  async function fetchMexc() {
    try {
      const { data } = await axios.get('/proxy/mexc')
      rawMarketstats.value.mexc = data
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinstore() {
    try {
      const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
      rawMarketstats.value.coinStore = data.data.find(item => item.symbol === 'AEUSDT')
      // coinStore.value = data.data.find(item => item.symbol === 'AEUSDT')
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchHotcoin() {
    try {
      const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
      rawMarketstats.value.hotCoin = data.ticker.find(item => item.symbol === 'ae_usdt')
      // hotCoin.value = data.ticker.find(item => item.symbol === 'ae_usdt')
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinW() {
    try {
      const { data } = await axios.get('/proxy/coinw')
      console.log('data.data', data.data)
      rawMarketstats.value.coinW = data.data.aeUsdt[1]
      console.log('rawMarketstats.value.coinW', rawMarketstats.value.coinW)
    } catch (e) {
      console.log('e', e)
    }
  }

  return {
    rawMarketstats,
    fetchMarketStats,
  }
})
