import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptNft, adaptNftTransfers } from '@/utils/adapters'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const nftId = ref(null)
  const rawNft = ref(null)
  const rawNftTransfers = ref(null)
  const nftInventory = ref(null)
  const nftOwners = ref(null)

  async function fetchNftDetails(id) {
    nftId.value = id

    await Promise.all([
      fetchNft(),
      // todo shift promisses
      Promise.allSettled([
        fetchNftTransfers(),
        fetchNftInventory(),
        fetchNftOwners(),
      ]),
    ])

    return true
  }

  const nft = computed(() => {
    return rawNft.value
      ? adaptNft(rawNft.value)
      : null
  })

  const nftTransfers = computed(() => {
    return rawNftTransfers.value
      ? adaptNftTransfers(rawNftTransfers.value)
      : null
  })

  async function fetchNft() {
    rawNft.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/${nftId.value}`)
    rawNft.value = data
  }

  async function fetchNftTransfers({ queryParameters, limit } = {}) {
    rawNftTransfers.value = null
    const defaultParameters = `/v2/aex141/transfers/${nftId.value}?limit=${limit ?? 10}`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)

    rawNftTransfers.value = data
    console.log('rawNftTransfers.value', rawNftTransfers.value)
  }

  async function fetchNftInventory({ queryParameters, limit } = {}) {
    nftInventory.value = null
    const defaultParameters = `/v2/aex141/${nftId.value}/templates?limit=${limit ?? 10}`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    nftInventory.value = data
    console.log('nftInventory.value', nftInventory.value)
  }

  async function fetchNftOwners({ queryParameters, limit } = {}) {
    nftOwners.value = null
    const defaultParameters = `/v2/aex141/${nftId.value}/owners?limit=${limit ?? 10}`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    nftOwners.value = data
    console.log('nftOwners.value', nftOwners.value)
    // todo connect

    // const obj = {
    //   data: [{
    //     contractId: 'ct_2w7MHbcyk5iM4yijZmjGcUF2DSZuVM1Mueppx5SSvPn5cgLJuZ',
    //     ownerId: 'ak_uTWegpfN6UjA4yz8X4ZVRi9xKEYeXHJDRZcRryTsRHAFoBpLa',
    //     tokenId: 1,
    //   }],
    //   next: null,
    //   prev: null,
    // }
    // nftOwners.value = obj
  }

  return {
    nft,
    fetchNftDetails,
    fetchNftTransfers,
    nftTransfers,
    fetchNftInventory,
    nftInventory,
    fetchNftOwners,
    nftOwners,
  }
})
