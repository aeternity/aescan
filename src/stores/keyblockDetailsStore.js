import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptKeyblock, adaptKeyblockMicroblocks } from '@/utils/adapters'

export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawKeyblock = ref(null)
  const keyblockDeltaStats = ref(null)
  const rawKeyblockMicroblocks = ref(null)

  const keyblockDetails = computed(() => {
    return rawKeyblock.value ? adaptKeyblock(rawKeyblock.value, keyblockDeltaStats.value) : null
  })
  const keyblockMicroblocks = computed(() => {
    return rawKeyblockMicroblocks.value ? adaptKeyblockMicroblocks(rawKeyblockMicroblocks.value) : null
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

  async function fetchKeyblockMicroblocks({ queryParameters, limit, keyblockHash } = {}) {
    rawKeyblockMicroblocks.value = null
    const defaultParameters = `/v2/key-blocks/${keyblockHash}/micro-blocks?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawKeyblockMicroblocks.value = data
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
