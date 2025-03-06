export const useStateChannelDetailsStore = defineStore('stateChannelDetails', () => {
  const stateChannelDetails = ref(null)
  const stateChannelTransactions = ref(null)
  const stateChannelTransactionsCount = ref(null)

  async function fetchStateChannelDetails(id) {
    await Promise.all([
      fetchStateChannel(id),
      // fetchStateChannelTransactionsCount(id),
    ])

    return true
  }

  async function fetchStateChannel(id) {
    stateChannelDetails.value = null
    stateChannelDetails.value = await $fetch(`/api/channels/${id}`)
  }

  async function fetchStateChannelTransactions({ id, queryParameters } = {}) {
    stateChannelTransactions.value = null
    stateChannelTransactions.value = await $fetch('/api/channels/transactions', {
      params: { queryParameters, direction: 'backward', channel: id },
    })
  }

  return {
    stateChannelDetails,
    stateChannelTransactions,
    stateChannelTransactionsCount,
    fetchStateChannelDetails,
    fetchStateChannelTransactions,
  }
})
