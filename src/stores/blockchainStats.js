import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { formatAettosToAe } from '@/utils/format'

export const useBlockchainStatsStore = defineStore('blockchainStats', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

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

  async function fetchTotalStats() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/totalstats?limit=1`)
    const lastBlock = data.data[0]
    activeOraclesCount.value = lastBlock.active_oracles
    oraclesCount.value = lastBlock.active_oracles + lastBlock.inactive_oracles
    activeNamesCount.value = lastBlock.active_names
    namesInAuctionCount.value = lastBlock.active_auctions
    contractsCount.value = lastBlock.contracts
    stateChannelsLockedValue.value = formatAettosToAe(lastBlock.locked_in_channels)
    stateChannelsCount.value = lastBlock.open_channels
    burnedCount.value = formatAettosToAe(lastBlock.burned_in_auctions)
    totalTokenSupply.value = Number(formatAettosToAe(lastBlock.total_token_supply))
  }

  async function fetchMaxTps() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/stats`)
    maxTps.value = data.max_transactions_per_second
  }

  async function fetchTotalTransactionsCount() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count`)
    transactionsCount.value = data
  }

  function increaseTransactionsCounter() {
    transactionsCount.value += 1
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
    increaseTransactionsCounter,
    totalTokenSupply,
  }
})
