import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { DateTime } from 'luxon'
import useAxios from '@/composables/useAxios'

export const useMinersStore = defineStore('miners', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const minersCount = ref(null)
  const blockReward = ref(null)
  const status = ref(null)
  const firstKeyblockTime = ref(null)
  const lastKeyblock = ref(null)
  const maxTPS = ref(null)

  const blocksPerMinute = computed(() => {
    // todo rename
    const blocksCount = lastKeyblock.value.height
    const timeStart = DateTime.fromMillis(firstKeyblockTime.value)
    const timeEnd = DateTime.fromMillis(lastKeyblock.value.time)
    const minutesCount = timeEnd.diff(timeStart, ['minutes']).minutes

    return minutesCount / blocksCount
  })

  function fetchMiners() {
    return Promise.all([
      fetchMinersCount(),
      fetchBlockReward(),
      fetchStatus(),
      fetchFirstBlockTime(),
      fetchLastBlock(),
      fetchMaxTps(),
    ])
  }

  async function fetchMinersCount() {
    minersCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    minersCount.value = data.minersCount
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

  async function fetchLastBlock() {
    lastKeyblock.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/key-blocks`)
    lastKeyblock.value = data.data[0]
    console.log('lastKeyblock.value', lastKeyblock.value)
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
    maxTPS,
    fetchMiners,
  }
})
