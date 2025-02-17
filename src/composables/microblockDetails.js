export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const microblockDetails = ref(null)
  const microblockTransactions = ref(null)

  async function fetchMicroblock(id) {
    microblockDetails.value = null
    microblockDetails.value = await $fetch(`/api/microblocks/${id}`)
  }

  async function fetchMicroblockTransactions({ queryParameters, limit, microblockHash, type } = {}) {
    console.log('queryParameters, limit, microblockHash', queryParameters, limit, microblockHash)
    microblockTransactions.value = null
    microblockTransactions.value = await $fetch('/api/microblocks/transactions', {
      params: { microblockHash, limit, queryParameters },
    })
  }

  return {
    microblockDetails,
    fetchMicroblock,
    microblockTransactions,
    fetchMicroblockTransactions,
  }
})
