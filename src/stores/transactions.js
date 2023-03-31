import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptTransactions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    rawTransactions: null,
    transactionsCount: null,
  }),
  getters: {
    transactions: state => {
      const store = useRecentBlocksStore()
      return state.rawTransactions
        ? adaptTransactions(state.rawTransactions, store.blockHeight)
        : null
    },
  },
  actions: {
    async fetchTransactions(queryParameters = null) {
      this.rawTransactions = null
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/txs?limit=10'}`)
      this.rawTransactions = data
    },
    async fetchTransactionsCount(txType = null) {
      this.transactionsCount = null
      const url = txType ? `${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count?tx_type=${txType}` : `${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count`
      const { data } = await axios.get(url)
      this.transactionsCount = data
    },
  },
})
