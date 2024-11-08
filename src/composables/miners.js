import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
// todo move it to api

export const useMinersStore = defineStore('miners', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const minersCount = ref(null)
  const blockReward = ref(null)
  const status = ref(null)
  const firstKeyblockTime = ref(null)
  const maxTPS = ref(null)
  const blocksPerMinute = ref(null)

  function fetchMiners() {
    return Promise.all([
      fetchMinersCount(),
      fetchBlockReward(),
      fetchStatus(),
      fetchFirstBlockTime(),
      fetchMaxTps(),
    ])
  }

  async function fetchMinersCount() {
    minersCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    minersCount.value = data.minersCount
    blocksPerMinute.value = (data.millisecondsPerBlock / 1000 / 60)
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

  async function fetchFirstBlockTime() {
    firstKeyblockTime.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/key-blocks/1`)
    firstKeyblockTime.value = data.time
  }

  async function fetchMaxTps() {
    maxTPS.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    maxTPS.value = data.maxTransactionsPerSecond
  }

  return {
    minersCount,
    blockReward,
    status,
    firstKeyblockTime,
    blocksPerMinute,
    blocksPer,
    maxTPS,
    fetchMiners,
  }
})
