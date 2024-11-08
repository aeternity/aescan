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

  function fetchMiners() {
    return Promise.all([
      fetchMinersCount(),
      fetchMin(),
      fetchBlockReward(),
      fetchStatus(),
      fetchMaxTps(),
    ])
  }

  async function fetchMinersCount() {
    // todo rename
    minersCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    minersCount.value = data.minersCount
    blocksPerMinute.value = data.millisecondsPerBlock / 1000 / 60
  }

  async function fetchMin() {
    // todo rename
    miners.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/miners`)
    miners.value = data
  }

  async function fetchBlockReward() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/delta?limit=1`)
    blockReward.value = data.data[0].blockReward
  }

  async function fetchStatus() {
    status.value = null
    const { data } = await axios.get(`${NODE_URL}/v3/status`)
    status.value = data
  }

  async function fetchMaxTps() {
    maxTPS.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    maxTPS.value = data.maxTransactionsPerSecond
  }

  return {
    miners,
    minersCount,
    blockReward,
    status,
    blocksPerMinute,
    maxTPS,
    fetchMiners,
  }
})
