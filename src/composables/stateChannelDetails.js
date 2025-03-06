export const useStateChannelDetailsStore = defineStore('stateChannelDetails', () => {
  const stateChannelDetails = ref(null)
  const stateChannelTransactions = ref(null)
  const stateChannelTransactionsCount = ref(null)

  async function fetchStateChannelDetails(id) {
    stateChannelDetails.value = null
    const data = await $fetch(`/api/channels/${id}`)
    if (data.error === 400) {
      throw showError({
        data: {
          entityId: id,
          entityName: 'State Channel',
        },
        statusMessage: 'EntityDetailsNotFound',
      })
    } else {
      stateChannelDetails.value = data
    }
  }

  async function fetchStateChannelTransactions({ id, queryParameters } = {}) {
    stateChannelTransactions.value = null

    const aaa = await $fetch('/api/channels/transactions', {
      params: { queryParameters, direction: 'backward', channel: id },
    })
    stateChannelTransactions.value = aaa
  }

  return {
    stateChannelDetails,
    stateChannelTransactions,
    stateChannelTransactionsCount,
    fetchStateChannelDetails,
    fetchStateChannelTransactions,
  }
})
