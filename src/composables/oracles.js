export const useOraclesStore = defineStore('oracles', () => {
  const oracles = ref(null)
  const oraclesCount = ref(null)

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
