import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useSearchStore = defineStore('search', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const namesResults = ref([])
  const tokensResults = ref([])
  const nftsResults = ref([])

  async function fetchNamesResults({ query, limit, queryParameters } = {}) {
    namesResults.value = null
    const defaultParameters = `/v3/names?prefix=${query}&limit=${limit ?? 10}&by=name`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    namesResults.value = data
  }

  async function fetchTokenResults({ query, limit, queryParameters } = {}) {
    tokensResults.value = null
    const defaultParameters = `/v3/aex9?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    tokensResults.value = data
  }

  async function fetchNftsResults({ query, limit, queryParameters } = {}) {
    nftsResults.value = null
    const defaultParameters = `/v3/aex141?prefix=${query}&limit=${limit ?? 10}&direction=forward`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
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
