import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptNftDetails } from '@/utils/adapters'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawNftDetails = ref(null)
  const nftTransfers = ref(null)

  const nftDetails = computed(() => {
    return rawNftDetails.value
      ? adaptNftDetails(rawNftDetails.value)
      : null
  })

  async function fetchNftDetails(contractId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/${contractId}`)
    rawNftDetails.value = data
  }

  async function fetchNftTransfers(contractId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/transfers/${contractId}`)
    nftTransfers.value = data
  }

  return {
    nftDetails,
    fetchNftDetails,
    fetchNftTransfers,
    nftTransfers,
  }
})
