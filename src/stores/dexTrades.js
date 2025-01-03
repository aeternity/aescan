import { defineStore } from 'pinia'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const trades = ref(null)

  async function fetchDexTrades({ queryParameters, limit } = {}) {
    trades.value = null
    const data = await $fetch('/api/dex/trades', { params: { queryParameters, limit } })
    trades.value = data
  }

  return {
    fetchDexTrades,
    trades,
  }
},
)
