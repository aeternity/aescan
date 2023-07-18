import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptKeyblock } from '@/utils/adapters'

export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawKeyblock = ref(null)
  const keyblockDeltaStats = ref(null)
  const keyblockMicroblocks = ref(null)

  const keyblockDetails = computed(() => {
    return rawKeyblock.value ? adaptKeyblock(rawKeyblock.value, keyblockDeltaStats.value) : null
  })

  async function fetchKeyblock(keyblockHash) {
    await fetchKeyblockDetails(keyblockHash)
    await fetchKeyblockDeltaStats(rawKeyblock.value.height)
  }

  async function fetchKeyblockDetails(keyblockHash) {
    rawKeyblock.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks/${keyblockHash}`)
    rawKeyblock.value = data
  }

  async function fetchKeyblockMicroblocks(keyblockHash) {
    keyblockMicroblocks.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks/${keyblockHash}/micro-blocks`)
    keyblockMicroblocks.value = data
  }

  async function fetchKeyblockDeltaStats(keyblockHeight) {
    keyblockDeltaStats.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/deltastats?scope=gen:${keyblockHeight}`)
    keyblockDeltaStats.value = data.data[0]
  }

  return {
    rawKeyblock,
    keyblockDeltaStats,
    keyblockDetails,
    fetchKeyblock,
    fetchKeyblockMicroblocks,
    keyblockMicroblocks,
  }
})
