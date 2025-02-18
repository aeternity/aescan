import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatNumber } from '~/utils/format'

const { NODE_URL } = useRuntimeConfig().public
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
  const url = getUrl({ entity: 'stats' })
  const { data } = await axios.get(url)
  return data
}

async function fetchBlockReward() {
  const url = getUrl({ entity: 'stats/delta', limit: 1 })
  const { data } = await axios.get(url)
  return data.data[0].blockReward
}

async function fetchStatus() {
  const url = getUrl({ node: true, entity: 'status' })
  const { data } = await axios.get(url)
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
