import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptAccountNames, adaptTransactions } from '@/utils/adapters'
import { formatAettosToAe } from '@/utils/format'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useAccountStore = defineStore('account', {
  state: () => ({
    rawAccountDetails: null,
    accountTransactionsCount: null,
    totalAccountTransactionsCount: null,
    accountNamesCount: null,
    selectedKeyblock: null,
    selectedMicroblock: null,
    selectedKeyblockMicroblocks: null,
    selectedMicroblockTransactions: null,
    rawAccountNames: null,
    rawAccountTransactions: null,
  }),
  getters: {
    accountDetails(state) {
      return state.rawAccountDetails
        ? {
          ...state.rawAccountDetails,
          balance: formatAettosToAe(state.rawAccountDetails.balance),
          transactionsCount: state.accountTransactionsCount,
          totalTransactionsCount: state.totalAccountTransactionsCount,
          namesCount: state.accountNamesCount,
          isGeneralized: state.rawAccountDetails.kind === 'generalized',
        }
        : null
    },
    accountTransactions(state) {
      return state.rawAccountTransactions
        ? adaptTransactions(state.rawAccountTransactions)
        : null
    },
    accountNames(state) {
      const store = useRecentBlocksStore()
      return state.rawAccountNames
        ? adaptAccountNames(state.rawAccountNames, store.blockHeight)
        : null
    },
  },
  actions: {
    fetchAccount(accountId, { limit } = {}) {
      this.fetchAccountDetails(accountId)
      this.fetchAccountNamesCount(accountId)
      this.fetchAccountTransactions({ accountId, limit })
      this.fetchAccountTransactionsCount(accountId)
      this.fetchAccountNames({ accountId, limit })
    },
    async fetchAccountDetails(accountId) {
      try {
        const { data } = await axios.get(`${useRuntimeConfig().public.NODE_URL}/v3/accounts/${accountId}`)
        this.rawAccountDetails = data
      } catch (e) {
        if (e.response.status === 404) {
          this.rawAccountDetails = { id: accountId, notExistent: true }
        }
      }
    },
    async fetchAccountTransactionsCount(accountId, txType = null) {
      this.accountTransactionsCount = null
      const txCountUrl = new URL(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count`)
      txCountUrl.searchParams.append('id', accountId)

      if (txType) {
        txCountUrl.searchParams.append('tx_type', txType)
      }

      const { data } = await axios.get(txCountUrl.toString())

      this.accountTransactionsCount = data
    },
    async fetchTotalAccountTransactionsCount(accountId) {
      this.totalAccountTransactionsCount = null
      const txCountUrl = new URL(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count`)
      txCountUrl.searchParams.append('id', accountId)
      const { data } = await axios.get(txCountUrl.toString())
      this.totalAccountTransactionsCount = data
    },
    async fetchAccountNames({ accountId, queryParameters, limit } = {}) {
      const defaultParameters = `/v2/names?owned_by=${accountId}&by=name&direction=forward&state=active&limit=${limit ?? 10}`
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
      this.rawAccountNames = data
    },
    async fetchAccountNamesCount(accountId) {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/names?owned_by=${accountId}&state=active`)
      this.accountNamesCount = data.data.length
    },
    async fetchAccountTransactions({ accountId, type, limit, queryParameters } = {}) {
      this.rawAccountTransactions = null

      if (queryParameters) {
        const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters}`)
        this.rawAccountTransactions = data
        return
      }

      const transactionsUrl = new URL(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs`)
      transactionsUrl.searchParams.append('direction', 'backward')
      transactionsUrl.searchParams.append('limit', limit ?? 10)

      if (accountId) {
        transactionsUrl.searchParams.append('account', accountId)
      }

      if (type) {
        transactionsUrl.searchParams.append('type', type)
      }

      const { data } = await axios.get(transactionsUrl.toString())
      this.rawAccountTransactions = data
    },
  },
})
