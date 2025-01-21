import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useConfigStore = defineStore('config', () => {
  const axios = useAxios()
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
