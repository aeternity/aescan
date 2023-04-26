import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptOracles } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useOraclesStore = defineStore('oracles', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const recentBlocksStore = useRecentBlocksStore()
  const { blockHeight } = storeToRefs(recentBlocksStore)

  const rawOracles = ref(null)

  const oracles = computed(() => {
    return rawOracles.value
      ? adaptOracles(rawOracles.value, blockHeight.value)
      : null
  })

  async function fetchOracles({ queryParameters, limit } = {}) {
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
