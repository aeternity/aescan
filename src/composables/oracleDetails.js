export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const oracleDetails = ref(null)
  const oracleEvents = ref(null)

  async function fetchOracleDetails(id) {
    oracleDetails.value = await $fetch(`/api/oracles/${id}`)
    return true
  }

  async function fetchOracleEvents({ id, queryParameters = null }) {
    oracleEvents.value = null
    oracleEvents.value = await $fetch('/api/oracles/events', {
      params: {
        queryParameters,
        id,
      },
    })
  }

  return {
    fetchOracleDetails,
    fetchOracleEvents,
    oracleDetails,
    oracleEvents,
  }
})
