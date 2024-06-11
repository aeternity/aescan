import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { MARKET_STATS_COINSTORE_ADDRESS, MARKET_STATS_HOTCOIN_ADDRESS } from '~/utils/constants'

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
      const { data } = await axios.get('/proxy/gate')
      gate.value = data[0]
    } catch (e) {
      console.log('eee', e)
    }
  }

  async function fetchMexc() {
    mexc.value = null
    try {
      const { data } = await axios.get('/proxy/mexc')
      mexc.value = data
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinstore() {
    hotCoin.value = null
    try {
      const { data } = await axios.get(MARKET_STATS_COINSTORE_ADDRESS)
      coinStore.value = data.data.find(item => item.symbol === 'AEUSDT')
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchHotcoin() {
    hotCoin.value = null
    try {
      const { data } = await axios.get(MARKET_STATS_HOTCOIN_ADDRESS)
      hotCoin.value = data.ticker.find(item => item.symbol === 'ae_usdt')
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinW() {
    coinW.value = null
    try {
      const { data } = await axios.get('/proxy/coinw')
      console.log('data.data', data.data)

      coinW.value = Object.entries(data.data).find(pair => {
        console.log('pair[0]', pair[0])
        return pair[0] === 'aeUsdt'
      })
      console.log('coinW.value', coinW.value)
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
