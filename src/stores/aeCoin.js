import { defineStore } from 'pinia'

export const useAeCoinStore = defineStore('aeCoin', () => {
  const coinMarkets = ref(null)
  const isLoading = ref(true)

  async function fetchMarketStats() {
    console.log('fetchMarketStats')
    isLoading.value = true
    const data = await $fetch('/api/tokens/ae')
    coinMarkets.value = data
    isLoading.value = false
  }

  return {
    isLoading,
    coinMarkets,
    fetchMarketStats,
  }
})
