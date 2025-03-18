export const useNftsStore = defineStore('nfts', () => {
  const nfts = ref(null)

  async function fetchNfts(queryParameters) {
    nfts.value = null
    nfts.value = await $fetch('/api/nfts', {
      params: { queryParameters },
    })
  }

  return {
    nfts,
    fetchNfts,
  }
})
