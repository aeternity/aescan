import { ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokens', () => {
  const listedTokens = ref(null)
  const allTokens = ref(null)

  async function fetchAllTokens(queryParameters = null) {
    allTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/aex9?by=name&direction=forward'}`)
    allTokens.value = data
  }

  function getListedTokens() {
    listedTokens.value = {
      next: null,
      prev: null,
      data: LISTED_TOKENS,
    }
  }

  return {
    listedTokens,
    allTokens,
    fetchAllTokens,
    getListedTokens,
  }
})
