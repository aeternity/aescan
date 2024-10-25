import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useOraclesStore = defineStore('oracles', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const oracles = ref(null)
  const rawOraclesCount = ref(null)

  const activeOraclesCount = computed(() => {
    return rawOraclesCount.value?.activeOracles
  })
  const inativeOracles = computed(() => {
    return rawOraclesCount.value?.inactiveOracles
  })

  function getOraclesCount(state) {
    if (state === 'active') {
      return activeOraclesCount.value
    } else {
      return inativeOracles.value
    }
  }

  async function fetchOracles(queryParameters = null) {
    oracles.value = null
    const slug = `?${queryParameters.substring(3).split('?')[1]}`
    const data = await $fetch(`/api/oracles${slug}`)

    // const defaultParameters = '/v3/oracles?direction=backward&limit=10'
    // const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`,
    // )
    oracles.value = data
  }

  async function fetchOraclesCount() {
    rawOraclesCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/total?limit=1`)
    rawOraclesCount.value = data.data[0]
  }

  return {
    oracles,
    fetchOracles,
    fetchOraclesCount,
    getOraclesCount,
  }
})
