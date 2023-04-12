import { ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import { adaptListedTokens } from '~/utils/adapters'

export const useTokensStore = defineStore('tokens', () => {
  const rawListedTokens = ref(null)
  const allTokens = ref(null)

  const listedTokens = computed(() =>
    rawListedTokens.value
      ? adaptListedTokens(rawListedTokens.value)
      : null,
  )

  async function fetchAllTokens(queryParameters = null) {
    allTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/aex9?by=name&direction=forward'}`)
    allTokens.value = data
  }

  async function fetchListedTokens() {
    rawListedTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.DEX_BACKEND_URL}/tokens`)
    rawListedTokens.value = data
  }

  return {
    listedTokens,
    allTokens,
    fetchAllTokens,
    fetchListedTokens,
  }
})
