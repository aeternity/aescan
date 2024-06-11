import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

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
      fetchHotcoin(),
      fetchCoinstore(),
      fetchCoinW(),
    ])
  }

  async function fetchGate() {
    gate.value = null
    try {
      const { data } = await axios.get('/api3')
      gate.value = data[0]
    } catch (e) {
      console.log('eee', e)
    }
  }

  async function fetchMexc() {
    mexc.value = null
    try {
      const { data } = await axios.get('/api')
      mexc.value = data
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinstore() {
    hotCoin.value = null
    try {
      const { data } = await axios.get('https://api.coinstore.com/api/v1/market/tickers')
      coinStore.value = data.data.find(item => item.symbol === 'AEUSDT')
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchHotcoin() {
    hotCoin.value = null
    try {
      const { data } = await axios.get('https://api.hotcoinfin.com/v1/market/ticker')
      hotCoin.value = data.ticker.find(item => item.symbol === 'ae_usdt')
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinW() {
    coinW.value = null
    try {
      const data = await axios.get('/api2')
      console.log('fetchCoinW data', data)
      coinW.value = data
    } catch (e) {
      console.log('e', e)
    }
  }

  return {
    gate,
    mexc,
    hotCoin,
    coinStore,
    coinW,
    fetchMarketStats,
  }
})
