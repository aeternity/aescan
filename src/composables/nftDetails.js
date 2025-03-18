export const useNftDetailsStore = defineStore('nftDetails', () => {
  const nftDetails = ref(null)
  const nftTransfers = ref(null)
  const nftInventory = ref(null)
  const nftOwners = ref(null)

  // todo remove id
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
    nftDetails.value = await $fetch(`/api/nfts/${id}`)
  }

  async function fetchNftInventory({ id, queryParameters }) {
    nftInventory.value = null
    nftInventory.value = await $fetch('/api/nfts/inventory', {
      params: { id, queryParameters },
    })
  }

  async function fetchNftOwners({ id, queryParameters }) {
    nftOwners.value = null
    nftOwners.value = await $fetch('/api/nfts/owners', {
      params: { id, queryParameters },
    })
  }

  async function fetchNftTransfers({ id, queryParameters }) {
    nftTransfers.value = null
    nftTransfers.value = await $fetch('/api/nfts/transfers', {
      params: { id, queryParameters },
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
