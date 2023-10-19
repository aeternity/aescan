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
  const rawOraclesCount = ref(null)

  const activeOraclesCount = computed(() => {
    return rawOraclesCount.value?.activeOracles
  })
  const inativeOracles = computed(() => {
    return rawOraclesCount.value?.inactiveOracles
  })

  const oracles = computed(() => {
    return rawOracles.value
      ? adaptOracles(rawOracles.value, blockHeight.value)
      : null
  })

  function getOraclesCount(state) {
    if (state === 'active') {
      return activeOraclesCount.value
    } else {
      return inativeOracles.value
    }
  }

  async function fetchOracles(queryParameters = null) {
    rawOracles.value = null
    const defaultParameters = '/v2/oracles?direction=backward&limit=10'
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || defaultParameters}`,
    )
    rawOracles.value = data
  }

  async function fetchOraclesCount() {
    rawOraclesCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/totalstats?limit=1`)
    rawOraclesCount.value = data.data[0]
  }

  return {
    oracles,
    fetchOracles,
    fetchOraclesCount,
    getOraclesCount,
  }
})
