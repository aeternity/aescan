import { useRuntimeConfig } from 'nuxt/app'

export const useSearchStore = defineStore('search', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const namesResults = ref([])
  const tokensResults = ref([])
  const nftsResults = ref([])

  async function fetchNamesResults({ query, limit, queryParameters } = {}) {
    namesResults.value = null
    const defaultParameters = `/names?prefix=${query}&limit=${limit ?? 10}&by=name`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    namesResults.value = data
  }

  async function fetchTokenResults({ query, limit, queryParameters } = {}) {
    tokensResults.value = null
    const defaultParameters = `/aex9?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    tokensResults.value = data
  }

  async function fetchNftsResults({ query, limit, queryParameters } = {}) {
    nftsResults.value = null
    const defaultParameters = `/aex141?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    nftsResults.value = data
  }

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
