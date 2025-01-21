import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'

export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawMicroblock = ref(null)
  const rawMicroblockTransactions = ref(null)

  const microblockDetails = computed(() => {
    return rawMicroblock.value ? adaptMicroblock(rawMicroblock.value) : null
  })

  const microblockTransactions = computed(() => {
    return rawMicroblockTransactions.value ? adaptTransactions(rawMicroblockTransactions.value) : null
  })

  async function fetchMicroblock(microblockHash) {
    rawMicroblock.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/micro-blocks/${microblockHash}`)
    rawMicroblock.value = data
  }

  async function fetchMicroblockTransactions({ queryParameters, limit, microblockHash } = {}) {
    rawMicroblockTransactions.value = null
    const defaultParameters = `/v3/micro-blocks/${microblockHash}/transactions?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawMicroblockTransactions.value = data
  }

  return {
    rawMicroblock,
    microblockDetails,
    fetchMicroblock,
    microblockTransactions,
    fetchMicroblockTransactions,
  }
})
