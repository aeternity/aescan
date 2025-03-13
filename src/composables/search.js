export const useSearchStore = defineStore('search', () => {
  const namesResults = ref([])
  const tokensResults = ref([])
  const nftsResults = ref([])

  async function fetchNamesResults({ query, limit, queryParameters } = {}) {
    namesResults.value = null
    namesResults.value = await $fetch('/api/search/names', {
      params: { query, limit, queryParameters },
    })
  }

  async function fetchTokenResults({ query, queryParameters } = {}) {
    tokensResults.value = null
    tokensResults.value = await $fetch('/api/search/tokens', {
      params: { query, queryParameters },
    })
  }

  async function fetchNftsResults({ query, queryParameters } = {}) {
    nftsResults.value = null
    nftsResults.value = await $fetch('/api/search/nfts', {
      params: { query, queryParameters },
    })
  }

  async function isKeyblockAvailable(id) {
    // todo param
    // todo rename
    // todo review
    return await $fetch(`/api/search/${id}`)
  }

  async function isNameAvailable(name) {
    return await $fetch('/api/search/hasName', {
      params: { name },
    })
  }

  return {
    namesResults,
    tokensResults,
    nftsResults,
    isKeyblockAvailable,
    fetchTokenResults,
    fetchNamesResults,
    fetchNftsResults,
    isNameAvailable,
  }
})
