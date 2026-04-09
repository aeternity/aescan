export const useNftsStore = defineStore('nfts', () => {
  const nfts = ref(null)

  async function fetchNfts({ queryParameters, limit } = {}) {
    nfts.value = null
    nfts.value = await $fetch('/api/nfts', {
      params: { queryParameters, limit },
    })
  }

  return {
    nfts,
    fetchNfts,
  }
})
