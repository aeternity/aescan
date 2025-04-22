import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatKnownAddress, formatNumber } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async() => {
  const [statistics, blockReward, status, topMiners, hashrateStatistics] = await Promise.all([
    fetchMiningStats(),
    fetchBlockReward(),
    fetchStatus(),
    fetchTopMiners(),
    fetchHashrateStatistics(),
  ])
  return adaptMiningStatistics(statistics, blockReward, status, topMiners, hashrateStatistics)
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
    entity: 'stats/miners/top-24h',
  })
  const { data } = await axios.get(url)
  return data
}

async function fetchHashrateStatistics() {
  const url = getUrl({
    entity: 'stats/hashrate',
    limit: 999,
    parameters: {
      interval_by: 'month',
    },
  })
  const { data } = await axios.get(url)
  return data.data.slice(1).reverse()
}

function adaptMiningStatistics(statistics, blockReward, status, topMiners, hashrateStatistics) {
  return {
    blockReward: formatAettosToAe(blockReward),
    minersCount: statistics.minersCount,
    maxTPS: statistics.maxTransactionsPerSecond,
    peerCount: status.peerCount,
    difficulty: Math.round(status.difficulty / 1000000000),
    hashrate: Math.round(status.hashrate / 1000),
    topBlockHeight: formatNumber(status.topBlockHeight),
    blocksPerMinute: Math.round(statistics.millisecondsPerBlock / 1000 / 60),
    topMiners: {
      miners: topMiners.map(item => formatKnownAddress(item.miner)),
      blocksMined: topMiners.map(item => item.blocksMined),
    },
    hashrateStatistics,
  }
}
