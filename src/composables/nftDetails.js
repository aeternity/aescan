import { useRuntimeConfig } from 'nuxt/app'

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
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/aex141/${nftId.value}`)
    rawNft.value = data
  }

  async function fetchNftInventory({ queryParameters, limit } = {}) {
    nftInventory.value = null
    const defaultParameters = `/v3/aex141/${nftId.value}/templates?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    nftInventory.value = data
  }

  async function fetchNftOwners({ queryParameters, limit } = {}) {
    nftOwners.value = null
    const defaultParameters = `/v3/aex141/${nftId.value}/tokens?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    nftOwners.value = data
  }

  async function fetchNftTransfers({ queryParameters, limit } = {}) {
    rawNftTransfers.value = null
    const defaultParameters = `/v3/aex141/${nftId.value}/transfers?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNftTransfers.value = data
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
