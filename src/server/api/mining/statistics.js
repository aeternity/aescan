import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatNumber } from '~/utils/format'

const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async() => {
  const [statistics, blockReward, status] = await Promise.all([
    fetchMiningStats(),
    fetchBlockReward(),
    fetchStatus(),
  ])
  return adaptMiningStatistics(statistics, blockReward, status)
})

async function fetchMiningStats() {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/stats`)
  return data
}

async function fetchBlockReward() {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/delta?limit=1`)
  return data.data[0].blockReward
}

async function fetchStatus() {
  const { data } = await axios.get(`${NODE_URL}/status`)
  return data
}

function adaptMiningStatistics(statistics, blockReward, status) {
  return {
    blockReward: formatAettosToAe(blockReward),
    minersCount: statistics.minersCount,
    maxTPS: statistics.maxTransactionsPerSecond,
    peerCount: status.peerCount,
    difficulty: Math.round(status.difficulty / 1000000000),
    hashrate: Math.round(status.hashrate / 1000),
    topBlockHeight: formatNumber(status.topBlockHeight),
    blocksPerMinute: Math.round(statistics.millisecondsPerBlock / 1000 / 60),
  }
}
