import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
// todo move it to api
// todo loading

export const useMinersStore = defineStore('miners', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const minersCount = ref(null)
  const miners = ref(null)
  const blockReward = ref(null)
  const status = ref(null)
  const maxTPS = ref(null)
  const blocksPerMinute = ref(null)
  const topMiners = ref(null)

  function fetchMining() {
    return Promise.all([
      fetchMiningStats(),
      fetchBlockReward(),
      fetchStatus(),
    ])
  }

  async function fetchMiningStats() {
    minersCount.value = null
    blocksPerMinute.value = null
    maxTPS.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats`)
    minersCount.value = data.minersCount
    blocksPerMinute.value = data.millisecondsPerBlock / 1000 / 60
    maxTPS.value = data.maxTransactionsPerSecond
  }

  async function fetchBlockReward() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/delta?limit=1`)
    blockReward.value = data.data[0].blockReward
  }

  async function fetchStatus() {
    status.value = null
    const { data } = await axios.get(`${NODE_URL}/status`)
    status.value = data
  }

  async function fetchMiners({ queryParameters, limit } = {}) {
    miners.value = null
    const defaultParameters = `/stats/miners?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    miners.value = data
  }

  async function fetchTopMiners({ queryParameters, limit } = {}) {
    topMiners.value = null
    const defaultParameters = '/stats/miners/top?interval_by=day&min_start_date=2025-02-11&max_start_date=2025-02-11&limit=10&direction=forward'
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    topMiners.value = data.data
  }

  return {
    miners,
    minersCount,
    status,
    blockReward,
    blocksPerMinute,
    maxTPS,
    fetchMining,
    fetchMiners,
    fetchTopMiners,
    topMiners,
  }
})
