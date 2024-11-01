import { defineStore } from 'pinia'

export const useNftsStore = defineStore('nfts', () => {
  const nfts = ref(null)
  const nftsCount = ref(null)

  function fetchNfts(queryParameters) {
    return Promise.allSettled([
      fetchNftsList(queryParameters),
      fetchNftsCount(),
    ])
  }


  // todo naming list
  async function fetchNftsList({ queryParameters, limit } = {}) {
    nfts.value = null
      const data = await $fetch(`/api/nfts`, {params: {limit, queryParameters}})
    nfts.value = data
  }

  // todo list a count soplecne nebo ne?
  async function fetchNftsCount() {
    nftsCount.value = null
    const data = await $fetch(`/api/nfts/count`)
    nftsCount.value = data
  }

  return {
    nftsCount,
    nfts,
    fetchNfts,
    fetchNftsList,
  }
})
