import { useRuntimeConfig } from 'nuxt/app'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const axios = useAxios()
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { price } = storeToRefs(useMarketStatsStore())

  const rawTrades = ref(null)

  const trades = computed(() => rawTrades.value && price.value
    ? adaptTrades(rawTrades.value, price.value)
    : null,
  )

  // todo simplify queryparams
  async function fetchDexTrades({ queryParameters } = {}) {
    rawTrades.value = null
    const defaultParameters = '/dex/swaps?limit=10'
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTrades.value = data
  }

  return {
    fetchDexTrades,
    trades,
  }
})
