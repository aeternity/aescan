import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const nftDetails = ref(null)

  async function fetchNftDetails(contractId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/${contractId}`)
    nftDetails.value = data
  }

  return {
    nftDetails,
    fetchNftDetails,
  }
})
