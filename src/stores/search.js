import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const namesResults = ref([])
  const tokensResults = ref([])
  const nftsResults = ref([])

  async function fetchNamesResults({ query, limit, queryParameters } = {}) {
    namesResults.value = null
    const data = await $fetch(`/api/search/names`, {params: {query, limit, queryParameters}})
    namesResults.value = data
  }

  async function fetchTokenResults({ query, limit, queryParameters } = {}) {
    tokensResults.value = null
    const data = await $fetch(`/api/search/tokens`, {params: {query, limit, queryParameters}})
    tokensResults.value = data
  }

  async function fetchNftsResults({ query, limit, queryParameters } = {}) {
    nftsResults.value = null
    const data = await $fetch(`/api/search/nfts`, {params: {query, limit, queryParameters}})
    nftsResults.value = data
  }

  return {
    namesResults,
    tokensResults,
    nftsResults,
    fetchTokenResults,
    fetchNamesResults,
    fetchNftsResults,
  }
})
