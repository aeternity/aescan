export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const oracleId = ref(null)
  const oracleDetails = ref(null)
  const oracleEvents = ref(null)

  async function fetchOracleDetails(id) {
    oracleDetails.value = await $fetch(`/api/oracles/${id}`)
    return true
  }

  async function fetchOracleEvents({ id, queryParameters = null, limit = 10 }) {
    oracleEvents.value = null
    oracleEvents.value = await $fetch('/api/oracles/events', {
      params: {
        queryParameters,
        limit: 10,
        id,
      },
    })
  }

  return {
    fetchOracleDetails,
    fetchOracleEvents,
    oracleDetails,
    oracleEvents,
    oracleId,
  }
})
