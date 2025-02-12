import { useRuntimeConfig } from 'nuxt/app'

export const useSearchStore = defineStore('search', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const namesResults = ref([])
  const tokensResults = ref([])
  const nftsResults = ref([])

  async function fetchNamesResults({ query, limit, queryParameters } = {}) {
    namesResults.value = null
    namesResults.value = await $fetch('/api/search/names', {
      params: { query, limit, queryParameters },
    })
  }

  async function fetchTokenResults({ query, limit, queryParameters } = {}) {
    tokensResults.value = null
    tokensResults.value = await $fetch('/api/search/tokens', {
      params: { query, limit, queryParameters },
    })
  }

  async function fetchNftsResults({ query, limit, queryParameters } = {}) {
    nftsResults.value = null
    nftsResults.value = await $fetch('/api/search/nfts', {
      params: { query, limit, queryParameters },
    })
  }

  // todo refactor
  async function isKeyblockAvailable(keyblockHash) {
    try {
      await axios.get(`${MIDDLEWARE_URL}/key-blocks/${keyblockHash}`)
      return true
    } catch (error) {
      if (error.response.status === 404) {
        return false
      }
      return null
    }
  }

  return {
    namesResults,
    tokensResults,
    nftsResults,
    isKeyblockAvailable,
    fetchTokenResults,
    fetchNamesResults,
    fetchNftsResults,
  }
})
