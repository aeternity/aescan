export const useNftDetailsStore = defineStore('nftDetails', () => {
  const nftDetails = ref(null)
  const nftTransfers = ref(null)
  const nftInventory = ref(null)
  const nftOwners = ref(null)

  async function fetchNftDetails(id) {
    await Promise.all([
      fetchNft(id),
      Promise.allSettled([
        fetchNftTransfers({ id }),
        fetchNftInventory({ id }),
        fetchNftOwners({ id }),
      ]),
    ])

    return true
  }

  async function fetchNft(id) {
    nftDetails.value = null
    const data = await $fetch(`/api/nfts/${id}`)
    if (data.error) {
      throw createError({ statusCode: data.error })
    }
    nftDetails.value = data
  }

  async function fetchNftInventory({ id, queryParameters, limit } = {}) {
    nftInventory.value = null
    nftInventory.value = await $fetch('/api/nfts/inventory', {
      params: { id, queryParameters, limit },
    })
  }

  async function fetchNftOwners({ id, queryParameters, limit } = {}) {
    nftOwners.value = null
    nftOwners.value = await $fetch('/api/nfts/owners', {
      params: { id, queryParameters, limit },
    })
  }

  async function fetchNftTransfers({ id, queryParameters, limit } = {}) {
    nftTransfers.value = null
    nftTransfers.value = await $fetch('/api/nfts/transfers', {
      params: { id, queryParameters, limit },
    })
  }

  return {
    nftDetails,
    nftTransfers,
    nftInventory,
    nftOwners,
    fetchNftDetails,
    fetchNftTransfers,
    fetchNftInventory,
    fetchNftOwners,
  }
})
