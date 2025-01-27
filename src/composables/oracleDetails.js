export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const oracleId = ref(null)
  const oracleDetails = ref(null)
  const lastExtendedTx = ref(null)

  const oracleEvents = ref(null)

  async function fetchOracleDetails(id) {
    oracleId.value = id
    await Promise.all([
      fetchOracle(),
      // Promise.allSettled([
      //   fetchOracleEvents(),
      // ]),
    ])
    // todo simplify

    return true
  }

  async function fetchOracle() {
    oracleDetails.value = null
    // todo do i need to null? before wasnt there
    const data = await $fetch(`/api/oracles/${oracleId.value}`)
    oracleDetails.value = data
  }

  //
  // async function fetchOracleEvents({ queryParameters = null, limit = null, id = null }) {
  //   await Promise.all([
  //     fetchEvents({ queryParameters, limit, id }),
  //   ])
  //   return true
  // }

  async function fetchOracleEvents({ queryParameters = null, limit = 10 }) {
    // todo events pass cursor
    // console.log('aaa', aaa)
    // oracleEvents.value = null
    console.log('oracleId.value', oracleId.value)
    const data = await $fetch('/api/oracles/events', {
      params: {
        queryParameters,
        limit: 10,
        id: oracleId.value,
      },
    })
    console.log('data', data)
    oracleEvents.value = data
  }

  return {
    fetchOracleDetails,
    fetchOracleEvents,
    oracleDetails,
    oracleId,
    lastExtendedTx,
    oracleEvents,
  }
})
