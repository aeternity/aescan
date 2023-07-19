import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptMicroblock, adaptMicroblockTransactions } from '@/utils/adapters'

export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawMicroblock = ref(null)
  const rawMicroblockTransactions = ref(null)

  const microblockDetails = computed(() => {
    return rawMicroblock.value ? adaptMicroblock(rawMicroblock.value) : null
  })

  const microblockTransactions = computed(() => {
    return rawMicroblockTransactions.value ? adaptMicroblockTransactions(rawMicroblockTransactions.value) : null
  })

  async function fetchMicroblock(microblockHash) {
    rawMicroblock.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/micro-blocks/${microblockHash}`)
    rawMicroblock.value = data
  }

  async function fetchMicroblockTransactions({ queryParameters, limit, microblockHash } = {}) {
    console.log('queryParameters, limit, microblockHash', queryParameters, limit, microblockHash)

    rawMicroblockTransactions.value = null
    const defaultParameters = `/v2/micro-blocks/${microblockHash}/txs?limit=${limit ?? 10}`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
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
