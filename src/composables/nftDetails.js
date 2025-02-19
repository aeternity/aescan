import { useRuntimeConfig } from 'nuxt/app'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const nftId = ref(null)
  const rawNftDetails = ref(null)
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

  const nftDetails = computed(() => {
    return rawNftDetails.value
      ? adaptNft(rawNftDetails.value)
      : null
  })

  const nftTransfers = computed(() => {
    return rawNftTransfers.value
      ? adaptNftTransfers(rawNftTransfers.value)
      : null
  })

  async function fetchNft() {
    rawNftDetails.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/aex141/${nftId.value}`)
    rawNftDetails.value = data
  }

  async function fetchNftInventory({ queryParameters } = {}) {
    nftInventory.value = null
    const defaultParameters = `/aex141/${nftId.value}/templates?limit=10`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters.substring(3) || defaultParameters}`)
    nftInventory.value = data
  }

  async function fetchNftOwners({ queryParameters } = {}) {
    nftOwners.value = null
    const defaultParameters = `/aex141/${nftId.value}/tokens?limit=10`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters.substring(3) || defaultParameters}`)
    nftOwners.value = data
  }

  async function fetchNftTransfers({ queryParameters } = {}) {
    rawNftTransfers.value = null
    const defaultParameters = `/aex141/${nftId.value}/transfers?limit=10`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters.substring(3) || defaultParameters}`)
    rawNftTransfers.value = data
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
