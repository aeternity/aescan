import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptNftDetails, adaptNftTransfers } from '@/utils/adapters'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawNftDetails = ref(null)
  const rawNftTransfers = ref(null)
  const nftInventory = ref(null)
  const nftOwners = ref(null)

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

  async function fetchNftInventory({ queryParameters, limit, contractId } = {}) {
    nftInventory.value = null
    const defaultParameters = `/v2/aex141/${contractId}/templates?limit=${limit ?? 10}`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    nftInventory.value = data
  }

  function fetchNftOwners({ queryParameters, limit, contractId } = {}) {
    nftOwners.value = null

    const obj = {
      data: [{
        contractId: 'ct_2w7MHbcyk5iM4yijZmjGcUF2DSZuVM1Mueppx5SSvPn5cgLJuZ',
        ownerId: 'ak_uTWegpfN6UjA4yz8X4ZVRi9xKEYeXHJDRZcRryTsRHAFoBpLa',
        tokenId: 1,
      }],
      next: null,
      prev: null,
    }
    nftOwners.value = obj
  }

  return {
    nftDetails,
    fetchNftDetails,
    fetchNftTransfers,
    nftTransfers,
    fetchNftInventory,
    nftInventory,
    fetchNftOwners,
    nftOwners,
  }
})
