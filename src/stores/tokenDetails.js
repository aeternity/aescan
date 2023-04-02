import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptTokenDetails } from '@/utils/adapters'

export const useTokenDetailsStore = defineStore('tokenDetails', {
  state: () => ({
    tokenId: null,
    tokenInformation: null,
    tokenBalance: null,
  }),
  actions: {
    fetchTokenDetails(tokenId) {
      this.tokenId = tokenId
      return Promise.allSettled([
        this.fetchTokenInformation(),
        this.fetchTokenBalance(),
      ])
    },
    async fetchTokenInformation() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/aex9/${this.tokenId}`)
      this.tokenInformation = data
    },
    async fetchTokenBalance() {
      // todo: fetch token balance
    },
  },
  getters: {
    tokenDetails(state) {
      return state.tokenInformation
        ? adaptTokenDetails(state.tokenInformation, state.tokenBalance)
        : null
    },
  },
})
