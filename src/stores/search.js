import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawNamesResults = ref([])
  const tokensResults = ref([])
  const keyblockResults = ref([])

  const namesResults = computed(() => {
    return rawNamesResults.value
      ? adaptNamesResults(rawNamesResults.value)
      : null
  })

  async function fetchNamesResults({ query, limit, queryParameters } = {}) {
    rawNamesResults.value = null
    const defaultParameters = `/v2/names/search?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNamesResults.value = data
  }

  async function fetchTokenResults({ query, limit, queryParameters } = {}) {
    tokensResults.value = null
    const defaultParameters = `/v2/aex9?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    tokensResults.value = data
  }

  async function fetchKeyblockResults(query) {
    keyblockResults.value = null
    if (!isNaN(query)) {
      try {
        const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks/${query}`)
        keyblockResults.value = data
      } catch (error) {
        if (error.response?.status === 404) {
          keyblockResults.value = { notExistent: true }
          return
        }

        throw error
      }
    }
  }

  return {
    namesResults,
    tokensResults,
    keyblockResults,
    fetchTokenResults,
    fetchNamesResults,
    fetchKeyblockResults,
  }
})
