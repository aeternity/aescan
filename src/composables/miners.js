import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { DateTime } from 'luxon'
import useAxios from '@/composables/useAxios'

export const useMinersStore = defineStore('miners', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const minersCount = ref(null)
  const blockReward = ref(null)
  const know = ref(null)
  const status = ref(null)
  const firstKeyblockTime = ref(null)
  const lastKeyblock = ref(null)

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
      fetchKnow(),
      fetchStatus(),
      fetchFirstBlockTime(),
      fetchLastBlock(),
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

  async function fetchKnow() {
    know.value = null
    const { data } = await axios.get('/proxy/know')
    know.value = data
  }

  async function fetchStatus() {
    status.value = null
    const { data } = await axios.get('https://mainnet.aeternity.io/v3/status')
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

  return {
    minersCount,
    blockReward,
    know,
    status,
    firstKeyblockTime,
    blocksPerMinute,
    fetchMiners,
  }
})
