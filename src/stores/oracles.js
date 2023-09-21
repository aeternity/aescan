import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptOracles } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useOraclesStore = defineStore('oracles', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const recentBlocksStore = useRecentBlocksStore()
  const { blockHeight } = storeToRefs(recentBlocksStore)

  const rawOracles = ref(null)

  const oracles = computed(() => {
    return rawOracles.value
      ? adaptOracles(rawOracles.value, blockHeight.value)
      : null
  })

  async function fetchOracles({ queryParameters, limit } = {}) {
    console.log('queryParameters', queryParameters)
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
