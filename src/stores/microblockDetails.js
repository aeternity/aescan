import { defineStore } from 'pinia'

export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const microblockDetails = ref(null)
  const microblockTransactions = ref(null)

  async function fetchMicroblock(microblockHash) {
    microblockDetails.value = null
    const data = await $fetch(`/api/microblocks/${microblockHash}`)
    // todo splelling 2 words?
    microblockDetails.value = data
  }

  async function fetchMicroblockTransactions({ queryParameters, limit, microblockHash } = {}) {
    microblockTransactions.value = null

    const data = await $fetch('/api/microblocks/transactions', { params: { microblockHash, limit, queryParameters } })
    microblockTransactions.value = data
  }

  return {
    microblockDetails,
    fetchMicroblock,
    microblockTransactions,
    fetchMicroblockTransactions,
  }
})
