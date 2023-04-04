import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'

export const useTokensStore = defineStore('tokens', {
  state: () => ({
    rawTokens: null,
  }),
  getters: {
    tokens: state => {
      return state.rawTokens
    },
  },
  actions: {
    async fetchTokens({ queryParameters } = {}) {
      const { data } = await axios.get(
        `${useRuntimeConfig().public.MIDDLEWARE_URL}/aex9/by_name`,
      )
      this.rawTokens = data
    },
    async fetchBalance() {
      return null
    },
  },
})
