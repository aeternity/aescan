export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const oracleDetails = ref(null)
  const oracleEvents = ref(null)

  async function fetchOracleDetails(id) {
    const data = await $fetch(`/api/oracles/${id}`)
    if (data.error) {
      throw createError({ statusCode: data.error })
    }
    oracleDetails.value = data
    return true
  }

  async function fetchOracleEvents({ id, queryParameters = null, limit = null } = {}) {
    oracleEvents.value = null
    oracleEvents.value = await $fetch('/api/oracles/events', {
      params: {
        queryParameters,
        id,
        limit,
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
