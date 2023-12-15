import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useSearchStore = defineStore('search', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawNamesResults = ref([])
  const tokensResults = ref([])
  const nftsResults = ref([])

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

  async function fetchNftsResults({ query, limit, queryParameters } = {}) {
    nftsResults.value = null
    const defaultParameters = `/v2/aex141?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    console.log('data', data)
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
