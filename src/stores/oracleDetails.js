import { defineStore } from 'pinia'

export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const oracleId = ref(null)
  const oracleDetails = ref(null)
  const lastExtendedTx = ref(null)
  const oracleEvents = ref(null)

  async function fetchOracleDetails(id) {
    oracleId.value = id
    await Promise.all([
      fetchOracle(),
    ])
    return true
  }

  async function fetchOracle() {
    oracleDetails.value = null
    // todo do i need to null? before wasnt there
    const data = await $fetch(`/api/oracles/${oracleId.value}`)
    oracleDetails.value = data
  }

  async function fetchOracleEvents(id = null) {
    // todo events pass cursor
    oracleEvents.value = null
    const data = await $fetch('/api/oracles/events', {
      params: {
        id,
      },
    })
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
