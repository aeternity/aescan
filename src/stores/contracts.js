import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptContracts } from '@/utils/adapters'

export const useContractsStore = defineStore('contracts', {
  state: () => ({
    rawContracts: null,
    contractsCount: null,
  }),
  getters: {
    contracts: state => {
      return state.rawContracts
        ? adaptContracts(state.rawContracts)
        : null
    },
  },
  actions: {
    async fetchContracts(queryParameters = null) {
      this.rawContracts = null
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/txs?type=contract_create&limit=10'}`)
      this.rawContracts = data
    },
    async fetchContractsCount() {
      this.contractsCount = null
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count?type=contract_create`)
      this.contractsCount = data
    },

  },
})
