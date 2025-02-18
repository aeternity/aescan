import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatNumber } from '~/utils/format'

const axios = useAxios()

export default defineEventHandler(async() => {
  const [statistics, blockReward, status, topMiners] = await Promise.all([
    fetchMiningStats(),
    fetchBlockReward(),
    fetchStatus(),
    fetchTopMiners(),
  ])
  return adaptMiningStatistics(statistics, blockReward, status, topMiners)
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

async function fetchTopMiners() {
  const url = getUrl({
    entity: 'stats/miners/top',
    parameters: {
      interval_by: 'day',
      min_start_date: '2025-02-11',
      max_start_date: '2025-02-11',
      direction: 'forward',
    },
  })

  const { data } = await axios.get(url)
  // todo different fetch function
  return data.data
}

function adaptMiningStatistics(statistics, blockReward, status, topMiners) {
  return {
    blockReward: formatAettosToAe(blockReward),
    minersCount: statistics.minersCount,
    maxTPS: statistics.maxTransactionsPerSecond,
    peerCount: status.peerCount,
    difficulty: Math.round(status.difficulty / 1000000000),
    hashrate: Math.round(status.hashrate / 1000),
    topBlockHeight: formatNumber(status.topBlockHeight),
    blocksPerMinute: Math.round(statistics.millisecondsPerBlock / 1000 / 60),
    topMiners,
  }
}
