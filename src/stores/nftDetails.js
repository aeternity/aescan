import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptNftDetails, adaptNftTransfers } from '@/utils/adapters'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawNftDetails = ref(null)
  const rawNftTransfers = ref(null)

  const nftDetails = computed(() => {
    return rawNftDetails.value
      ? adaptNftDetails(rawNftDetails.value)
      : null
  })

  const nftTransfers = computed(() => {
    return rawNftTransfers.value
      ? adaptNftTransfers(rawNftTransfers.value)
      : null
  })

  async function fetchNftDetails(contractId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/${contractId}`)
    rawNftDetails.value = data
  }

  async function fetchNftTransfers({ queryParameters, limit, contractId } = {}) {
    rawNftTransfers.value = null
    const defaultParameters = `/v2/aex141/transfers/${contractId}?limit=${limit ?? 10}`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNftTransfers.value = data
  }

  return {
    nftDetails,
    fetchNftDetails,
    fetchNftTransfers,
    nftTransfers,
  }
})
