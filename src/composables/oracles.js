export const useOraclesStore = defineStore('oracles', () => {
  const oracles = ref(null)
  const oraclesCount = ref(null)

  async function fetchOracles({ queryParameters = null, state = null, limit = null } = {}) {
    oracles.value = null
    oracles.value = await $fetch('/api/oracles', {
      params: {
        queryParameters,
        state,
        limit,
      },
    })
  }

  async function fetchOraclesCount(state) {
    oraclesCount.value = null
    oraclesCount.value = await $fetch('/api/oracles/count', {
      params: { state },
    })
  }

  return {
    oracles,
    oraclesCount,
    fetchOracles,
    fetchOraclesCount,
  }
})
