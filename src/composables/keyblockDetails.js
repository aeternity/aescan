export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const keyblockMicroblocks = ref(null)
  const keyblockTransactions = ref(null)
  const keyblockDetails = ref(null)

  async function fetchKeyblock(id) {
    keyblockDetails.value = null
    const data = await $fetch(`/api/keyblocks/${id}`)
    if (data.error === 400) {
      throw showError({
        data: {
          entityId: id,
          entityName: 'Keyblock',
        },
        statusMessage: 'EntityDetailsNotFound',
      })
    } else {
      keyblockDetails.value = data
    }
  }

  async function fetchKeyblockMicroblocks({ queryParameters, microblockHash, id } = {}) {
    keyblockMicroblocks.value = null
    keyblockMicroblocks.value = await $fetch('/api/keyblocks/microblocks', {
      params: { microblockHash, queryParameters, id },
    })
  }

  async function fetchKeyblockTransactions({ queryParameters, height, type } = {}) {
    keyblockTransactions.value = null
    keyblockTransactions.value = await $fetch('/api/keyblocks/transactions', {
      params: { height, queryParameters, type },
    })
  }

  return {
    keyblockDetails,
    keyblockMicroblocks,
    keyblockTransactions,
    fetchKeyblock,
    fetchKeyblockMicroblocks,
    fetchKeyblockTransactions,
  }
})
