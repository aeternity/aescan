import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const trades = ref(null)

  async function fetchTrades({ queryParameters, limit } = {}) {
    trades.value = null
    const defaultParameters = `/v3/dex/swaps?limit=${limit ?? 10}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    console.log('data', data)
    trades.value = data
  }

  return {
    fetchTrades,
    trades,
  }
})
