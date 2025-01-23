import { defineStore } from 'pinia'

export const useOraclesStore = defineStore('oracles', () => {
  const oracles = ref(null)
  const rawOraclesCount = ref(null)

  const activeOraclesCount = computed(() => {
    return rawOraclesCount.value?.activeOracles
  })

  const inactiveOraclesCount = computed(() => {
    return rawOraclesCount.value?.inactiveOraclesCount
  })

  function getOraclesCount(state) {
    if (state === 'active') {
      return activeOraclesCount.value
    } else {
      return inactiveOraclesCount.value
    }
  }

  async function fetchOracles(queryParameters = null) {
    oracles.value = null
    const slug = `?${queryParameters.substring(3).split('?')[1]}`
    const data = await $fetch(`/api/oracles${slug}`)
    oracles.value = data
  }

  async function fetchOraclesCount() {
    rawOraclesCount.value = null
    // todo here i am reusing total stats
    const data = await $fetch('/api/oracles/count')
    rawOraclesCount.value = data
  }

  return {
    oracles,
    fetchOracles,
    fetchOraclesCount,
    getOraclesCount,
  }
})
