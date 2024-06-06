import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { MEXC } from '~/utils/constants'

export const useAeCoinStore = defineStore('aeCoin', () => {
  const axios = useAxios()

  const gate = ref(null)
  const mexc = ref(null)
  const hotCoin = ref(null)
  const coinStore = ref(null)
  const coinW = ref(null)
  axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Security-Policy'] = '*'

  function fetchMarketStats() {
    return Promise.all([
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
      const data = await axios.get('https://api.gateio.ws/api/v4/spot/tickers?currency_pair=AE_USDT')
      console.log('fetchGate data', data)

      gate.value = data
    } catch (e) {
      console.log('eee', e)
    }
  }

  async function fetchMexc() {
    mexc.value = null
    try {
      const data = await axios.get(`${MEXC}/ticker/24hr?symbol=AEUSDT`)
      console.log('fetchMexc data', data)
      mexc.value = data
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchHotcoin() {
    hotCoin.value = null
    try {
      const { data } = await axios.get('https://api.hotcoinfin.com/v1/market/ticker')
      const aePair = data.ticker.find(item => item.symbol === 'ae_usdt')
      hotCoin.value = aePair
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinstore() {
    hotCoin.value = null
    try {
      const { data } = await axios.get('https://api.coinstore.com/api/v1/market/tickers')
      const aePair = data.data.find(item => item.symbol === 'AEUSDT')
      coinStore.value = aePair
    } catch (e) {
      console.log('e', e)
    }
  }

  async function fetchCoinW() {
    coinW.value = null
    try {
      const data = await axios.get('https://api.coinw.com/api/v1/public?command=returnTicker')
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
