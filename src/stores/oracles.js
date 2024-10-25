import { defineStore } from 'pinia'

export const useOraclesStore = defineStore('oracles', () => {
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
    oracles.value = data
  }

  async function fetchOraclesCount() {
    rawOraclesCount.value = null
    // todo here i am reusing total stats
    const data = await $fetch(`/api/oracles/count`)
   // todo get rid of raw and get
    rawOraclesCount.value = data
  }

  return {
    oracles,
    fetchOracles,
    fetchOraclesCount,
    getOraclesCount,
  }
})
