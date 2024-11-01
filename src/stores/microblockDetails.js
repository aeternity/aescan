import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptTransactions } from '@/utils/adapters'

export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

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

    const data = await $fetch(`/api/microblocks/transactions`, {params: {microblockHash, limit, queryParameters}})


    microblockTransactions.value = data
  }

  return {
    microblockDetails,
    fetchMicroblock,
    microblockTransactions,
    fetchMicroblockTransactions,
  }
})
