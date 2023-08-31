import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptOracles } from '@/utils/adapters'

export const useOraclesStore = defineStore('oracles', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawOracles = ref(null)

  const oracles = computed(() => {
    return rawOracles.value
      ? adaptOracles(rawOracles.value)
      : null
  })

  async function fetchOracles({ queryParameters, limit } = {}) {
    rawOracles.value = null
    const defaultParameters = `/v2/oracles?direction=backward&limit=${limit || 10}`
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || defaultParameters}`,
    )
    rawOracles.value = data
  }

  return {
    oracles,
    fetchOracles,
  }
})
