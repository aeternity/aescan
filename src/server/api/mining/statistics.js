import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const [statistics, blockReward, status] = await Promise.all([
    fetchMiningStats(),
    fetchBlockReward(),
    fetchStatus(),
  ])
  return {
    minersCount: statistics.minersCount,
    blocksPerMinute: statistics.millisecondsPerBlock / 1000 / 60,
    maxTPS: statistics.maxTransactionsPerSecond,
    blockReward,
    status,
  }
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
