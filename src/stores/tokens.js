import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'

export const useTokensStore = defineStore('tokens', {
  state: () => ({
    listedTokens: null,
    allTokens: null,
  }),

  actions: {
    async fetchAllTokens(queryParameters = null) {
      this.allTokens = null
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/aex9?by=name&direction=forward'}`)
      this.allTokens = data
    },
    getListedTokens() {
      this.listedTokens = {
        next: null,
        prev: null,
        data: LISTED_TOKENS,
      }
    },
  },
})
