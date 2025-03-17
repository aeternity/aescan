export const useNftsStore = defineStore('nfts', () => {
  const nfts = computed(() => {
    return rawNfts.value
      ? adaptNfts(rawNfts.value)
      : null
  })

  return {
    nftsCount,
    nfts,
    fetchNfts,
    fetchNftsList,
  }
})
