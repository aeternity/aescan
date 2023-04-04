import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'

export const useTokensStore = defineStore('tokens', {
  state: () => ({
    tokens: null,
  }),
  getters: {

    listedTokens: state => {
      return state.tokens?.filter(token =>
        LISTED_TOKENS_ADDRESSES.includes(token.contract_id),
      )
    },
    unlistedTokens: state => {
      return state.tokens?.filter(token =>
        !LISTED_TOKENS_ADDRESSES.includes(token.contract_id),
      )
    },
  },
  actions: {
    async fetchTokens({ queryParameters } = {}) {
      const { data } = await axios.get(
        `${useRuntimeConfig().public.MIDDLEWARE_URL}/aex9/by_name`,
      )
      this.tokens = data
    },
    async fetchBalance() {
      return null
    },
  },
})
