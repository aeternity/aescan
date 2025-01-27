export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const oracleId = ref(null)
  const oracleDetails = ref(null)
  const oracleEvents = ref(null)

  async function fetchOracleDetails(id) {
    oracleId.value = id
    await fetchOracle()
    return true
  }

  async function fetchOracle() {
    oracleDetails.value = null
    // todo do i need to null? before wasnt there
    const data = await $fetch(`/api/oracles/${oracleId.value}`)
    oracleDetails.value = data
  }

  async function fetchOracleEvents({ queryParameters = null, limit = 10 }) {
    oracleEvents.value = null
    oracleEvents.value = await $fetch('/api/oracles/events', {
      params: {
        queryParameters,
        limit: 10,
        id: oracleId.value,
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
