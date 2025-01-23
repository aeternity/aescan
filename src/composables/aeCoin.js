export const useAeCoinStore = defineStore('aeCoin', () => {
  const coinMarkets = ref(null)
  const tokenPairs = ref(null)
  const isLoading = ref(true)

  async function fetchMarketStats() {
    isLoading.value = true
    const data = await $fetch('/api/tokens/ae')
    coinMarkets.value = data
    isLoading.value = false
  }

  async function fetchTokenPairs() {
    isLoading.value = true
    const data = await $fetch('/api/tokens/trading')
    console.log('dataaaa', data)
    tokenPairs.value = data
    isLoading.value = false
  }

  return {
    isLoading,
    coinMarkets,
    tokenPairs,
    fetchMarketStats,
    fetchTokenPairs,
  }
})
