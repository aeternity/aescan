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
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/aex9'}`)
      this.allTokens = data
    },
    fetchListedTokens() {
      // todo get
      // todo constants
      this.listedTokens = {
        next: null,
        prev: null,
        data: [
          {
            contract_id: 'ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa',
            name: 'AE',
            symbol: 'AE',
          },
          {
            contract_id: 'ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa',
            symbol: 'WAE',
            name: 'Wrapped Aeternity',
          }, {
            contract_id: 'ct_KeTvHnhU85vuuQMMZocaiYkPL9tkoavDRT3Jsy47LK2YqLHYb',
            symbol: 'WTT',
            name: 'WeTrue Token',
          }, {
            contract_id: 'ct_7UfopTwsRuLGFEcsScbYgQ6YnySXuyMxQWhw6fjycnzS5Nyzq',
            symbol: 'ABC',
            name: 'ABC',
          },
        ],
      }
    },
  },
})
