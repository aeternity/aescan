import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawNamesFound = ref([])
  const tokensFound = ref([])

  const namesFound = computed(() => {
    return rawNamesFound.value
      ? adaptNamesFound(rawNamesFound.value)
      : null
  })

  async function fetchNamesSearch({ query, limit, queryParameters } = {}) {
    rawNamesFound.value = null
    const defaultParameters = `/v2/names/search?prefix=${query}&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNamesFound.value = data
  }

  async function fetchTokenSearch({ query, limit, queryParameters } = {}) {
    tokensFound.value = null
    const defaultParameters = `/v2/aex9?prefix=${query}&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    tokensFound.value = data
  }

  return {
    namesFound,
    tokensFound,
    fetchTokenSearch,
    fetchNamesSearch,
  }
})
