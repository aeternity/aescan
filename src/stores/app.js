import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useAppStore = defineStore('app', () => {
  const axios = useAxios()
  const { NODE_URL } = useRuntimeConfig().public

  const timeFormat = ref('relative')
  const currency = ref()

  function toggleTimeFormat() {
    timeFormat.value = timeFormat.value === 'absolute' ? 'relative' : 'absolute'
  }

  async function fetchCurrency() {
    const { data } = await axios.get(`${NODE_URL}/v3/currency`)

    currency.value = data
  }

  return {
    timeFormat,
    toggleTimeFormat,
    fetchCurrency,
    currency,
  }
})
