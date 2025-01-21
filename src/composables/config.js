import { useRuntimeConfig } from 'nuxt/app'

export const useConfigStore = defineStore('config', () => {
  const axios = useAxios()
  // todo axios
  const { NODE_URL } = useRuntimeConfig().public

  const currency = ref()

  async function fetchCurrency() {
    const { data } = await axios.get(`${NODE_URL}/v3/currency`)
    currency.value = data
  }

  return {
    fetchCurrency,
    currency,
  }
})
