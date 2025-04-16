export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const microblockDetails = ref(null)
  const microblockTransactions = ref(null)

  async function fetchMicroblock(id) {
    microblockDetails.value = null
    const data = await $fetch(`/api/microblocks/${id}`)
    if (data.error === 400) {
      throw showError({
        data: {
          entityId: id,
          entityName: 'Microblock',
        },
        statusMessage: 'EntityDetailsNotFound',
      })
    } else {
      microblockDetails.value = data
    }
  }

  async function fetchMicroblockTransactions({ queryParameters, microblockHash, type } = {}) {
    microblockTransactions.value = null
    microblockTransactions.value = await $fetch('/api/microblocks/transactions', {
      params: { microblockHash, queryParameters, type },
    })
  }

  return {
    microblockDetails,
    fetchMicroblock,
    microblockTransactions,
    fetchMicroblockTransactions,
  }
})
