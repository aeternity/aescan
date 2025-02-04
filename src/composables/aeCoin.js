export const useAeCoinStore = defineStore('aeCoin', () => {
  const coinMarkets = ref(null)
  const isLoading = ref(true)

  async function fetchMarketStats() {
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
