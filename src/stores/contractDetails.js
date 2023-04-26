import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptContractDetails, adaptContractEvents, adaptTransactions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useContractDetailsStore = defineStore('contractDetails', {
  state: () => ({
    contractId: null,
    contractCallsCount: null,
    contractCreationTx: null,
    contractType: null,
    rawContractInformation: null,
    rawContractEvents: null,
    rawContractCallTransactions: null,
  }),
  actions: {
    async fetchContractDetails(contractId) {
      this.contractId = contractId
      await Promise.allSettled([
        this.fetchContractInformation(),
        this.fetchContractCallsCount(),
        this.fetchContractCreationTx(),
        this.fetchContractType(),
      ])

      return true
    },
    async fetchContractInformation() {
      this.rawContractInformation = null
      const { data } = await axios.get(`${useRuntimeConfig().public.NODE_URL}/v3/contracts/${this.contractId}`)
      this.rawContractInformation = data
    },
    async fetchContractCallsCount() {
      this.contractCallsCount = null
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count/${this.contractId}`)
      this.contractCallsCount = Object.values(data?.contract_call_tx ?? {}).reduce((sum, value) => sum + value, 0)
    },
    async fetchContractCreationTx() {
      this.contractCreationTx = null
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs?limit=1&contract=${this.contractId}&direction=forward`)
      this.contractCreationTx = data?.data[0]
    },
    fetchContractType() {
      this.contractType = null
      return Promise.any([
        this.fetchIsContractAex9(this.contractId),
        this.fetchIsContractAex141(this.contractId),
      ])
    },
    async fetchContractEvents({ contractId = null, queryParameters = null }) {
      this.rawContractEvents = null
      const defaultParameters = `/v2/contracts/logs?contract_id=${contractId}`
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
      this.rawContractEvents = data
    },

    async fetchContractCallTransactions({ contractId, limit, queryParameters } = {}) {
      this.rawContractCallTransactions = null

      if (queryParameters) {
        const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters}`)
        this.rawContractCallTransactions = data
        return
      }

      const transactionsUrl = new URL(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs`)
      transactionsUrl.searchParams.append('direction', 'backward')
      transactionsUrl.searchParams.append('limit', limit ?? 10)
      transactionsUrl.searchParams.append('type', 'contract_call')
      transactionsUrl.searchParams.append('contract', contractId ?? this.contractId)

      const { data } = await axios.get(transactionsUrl.toString())
      this.rawContractCallTransactions = data
    },

    async fetchIsContractAex9(contractId) {
      await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/aex9/${contractId}`)
      this.contractType = 'AEX-9'
    },
    async fetchIsContractAex141(contractId) {
      await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/aex141/${contractId}`)
      this.contractType = 'AEX-141'
    },
  },
  getters: {
    contractEvents(state) {
      const store = useRecentBlocksStore()
      return state.rawContractEvents
        ? adaptContractEvents(state.rawContractEvents, store.blockHeight)
        : null
    },
    contractDetails(state) {
      if (state.contractCallsCount === null || !state.contractCreationTx || !state.rawContractInformation) {
        return null
      }

      return adaptContractDetails(
        state.rawContractInformation,
        state.contractCallsCount,
        state.contractCreationTx,
        state.contractType,
      )
    },
    contractCallTransactions(state) {
      return state.rawContractCallTransactions
        ? adaptTransactions(state.rawContractCallTransactions)
        : null
    },
  },
})
