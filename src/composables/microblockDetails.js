export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const microblockDetails = ref(null)
  const microblockTransactions = ref(null)

  async function fetchMicroblock(id) {
    microblockDetails.value = null
    microblockDetails.value = await $fetch(`/api/microblocks/${id}`)
  }

  async function fetchMicroblockTransactions({ queryParameters, limit, microblockHash, type } = {}) {
    microblockTransactions.value = null
    microblockTransactions.value = await $fetch('/api/microblocks/transactions', {
      params: { microblockHash, limit, queryParameters, type },
    })
  }

  return {
    microblockDetails,
    fetchMicroblock,
    microblockTransactions,
    fetchMicroblockTransactions,
  }
})
