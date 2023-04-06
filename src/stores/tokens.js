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
      this.allTokens = {
        next: data.next,
        prev: data.prev,
        data: await Promise.all(data.data.map(token => this.appendBalance(token))),
      }
    },
    async fetchListedTokens() {
      this.listedTokens = {
        next: null,
        prev: null,
        data: await Promise.all(LISTED_TOKENS.map(token => this.appendBalance(token))),
      }
    },
    async fetchBalancesSum(contractId) {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/aex9/balances/${contractId}`)
      const amountsArray = Object.values(data.amounts)
      return amountsArray.reduce((sum, increment) => sum + increment, 0)
    },
    async appendBalance(token) {
      const balance = await this.fetchBalancesSum(token.contract_id)
      return { ...token, balance }
    },
  },
})
