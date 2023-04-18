import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { formatAettosToAe } from '@/utils/format'

export const useBlockchainStatsStore = defineStore('blockchainStats', {
  state: () => ({
    maxTps: null,
    transactionsCount: null,
    activeOraclesCount: null,
    oraclesCount: null,
    activeNamesCount: null,
    namesInAuctionCount: null,
    contractsCount: null,
    stateChannelsLockedValue: null,
    stateChannelsCount: null,
    burnedCount: null,
  }),
  actions: {
    fetchBlockchainStats() {
      return Promise.all([
        this.fetchTotalStats(),
        this.fetchMaxTps(),
        this.fetchTotalTransactionsCount(),
      ])
    },
    async fetchTotalStats() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/totalstats?limit=1`)
      const lastBlock = data.data[0]
      this.activeOraclesCount = lastBlock.active_oracles
      this.oraclesCount = lastBlock.active_oracles + lastBlock.inactive_oracles
      this.activeNamesCount = lastBlock.active_names
      this.namesInAuctionCount = lastBlock.active_auctions
      this.contractsCount = lastBlock.contracts
      this.stateChannelsLockedValue = formatAettosToAe(lastBlock.locked_in_channels)
      this.stateChannelsCount = lastBlock.open_channels
      this.burnedCount = formatAettosToAe(lastBlock.burned_in_auctions)
    },
    async fetchMaxTps() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/stats`)
      this.maxTps = data.max_transactions_per_second
    },
    async fetchTotalTransactionsCount() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count`)
      this.transactionsCount = data
    },
    increaseTotalTransactionsCounter() {
      this.transactionsCount += 1
    },
  },
})
