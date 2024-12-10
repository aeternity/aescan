import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

export const useBlockchainStatsStore = defineStore('blockchainStats', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const maxTps = ref(null)
  const transactionsCount = ref(null)
  const activeOraclesCount = ref(null)
  const oraclesCount = ref(null)
  const activeNamesCount = ref(null)
  const namesInAuctionCount = ref(null)
  const contractsCount = ref(null)
  const stateChannelsLockedValue = ref(null)
  const stateChannelsCount = ref(null)
  const burnedCount = ref(null)
  const totalTokenSupply = ref(null)
  const activeAccounts = ref(null)

  async function fetchTotalStats() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/total?limit=1`)
    const lastBlock = data.data[0]
    activeOraclesCount.value = lastBlock.activeOracles
    oraclesCount.value = lastBlock.activeOracles + lastBlock.inactiveOracles
    activeNamesCount.value = lastBlock.activeNames
    namesInAuctionCount.value = lastBlock.activeAuctions
    contractsCount.value = lastBlock.contracts
    stateChannelsLockedValue.value = formatAettosToAe(lastBlock.lockedInChannels)
    stateChannelsCount.value = lastBlock.openChannels
    burnedCount.value = formatAettosToAe(lastBlock.burnedInAuctions)
    totalTokenSupply.value = formatAettosToAe(lastBlock.totalTokenSupply)
  }

  async function fetchMaxTps() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    maxTps.value = data.maxTransactionsPerSecond
  }

  async function fetchTotalTransactionsCount() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/count`)
    transactionsCount.value = data
  }

  async function fetchActiveAccounts() {
    activeAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/active-accounts?limit=1`)
    activeAccounts.value = data.data[0].count
  }

  return {
    maxTps,
    transactionsCount,
    activeOraclesCount,
    oraclesCount,
    activeNamesCount,
    namesInAuctionCount,
    contractsCount,
    stateChannelsLockedValue,
    stateChannelsCount,
    burnedCount,
    fetchTotalStats,
    fetchMaxTps,
    fetchTotalTransactionsCount,
    fetchActiveAccounts,
    totalTokenSupply,
    activeAccounts,
  }
})
