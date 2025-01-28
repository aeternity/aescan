export const useOraclesStore = defineStore('oracles', () => {
  const oracles = ref(null)
  const oraclesCount = ref(null)

  const activeOraclesCount = computed(() => {
    return oraclesCount.value?.activeOracles
  })

  const inactiveOraclesCount = computed(() => {
    return oraclesCount.value?.inactiveOracles
  })

  function getOraclesCount(state) {
    if (state === 'active') {
      return activeOraclesCount.value
    } else {
      return inactiveOraclesCount.value
    }
  }

  async function fetchOracles({ queryParameters = null, limit = null, state = null }) {
    oracles.value = null
    oracles.value = await $fetch('/api/oracles', {
      params: {
        queryParameters,
        limit,
        state,
      },
    })
  }

  async function fetchOraclesCount() {
    oraclesCount.value = null
    oraclesCount.value = await $fetch('/api/oracles/count')
  }

  return {
    oracles,
    fetchOracles,
    fetchOraclesCount,
    getOraclesCount,
  }
})
