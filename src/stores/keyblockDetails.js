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
    return rawKeyblock.value?.hash ? adaptKeyblock(rawKeyblock.value, keyblockDeltaStats.value) : rawKeyblock.value
  })
  const keyblockMicroblocks = computed(() => {
    return rawKeyblockMicroblocks.value ? adaptKeyblockMicroblocks(rawKeyblockMicroblocks.value) : null
  })

  async function fetchKeyblock(keyblockId) {
    await fetchKeyblockDetails(keyblockId)
    await fetchKeyblockDeltaStats(rawKeyblock.value.height)
  }

  async function fetchKeyblockDetails(keyblockId) {
    rawKeyblock.value = null
    try {
      const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks/${keyblockId}`)
      rawKeyblock.value = data
    } catch (error) {
      if (error.response?.status === 404) {
        rawKeyblock.value = { notExistent: true }
        return
      }
      throw error
    }
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

  async function isKeyblockAvailable(keyblockHash) {
    try {
      await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks/${keyblockHash}`)
      return true
    } catch (error) {
      if (error.response.status === 404) {
        return false
      }
      return null
    }
  }

  return {
    rawKeyblock,
    keyblockDeltaStats,
    keyblockDetails,
    fetchKeyblock,
    fetchKeyblockMicroblocks,
    keyblockMicroblocks,
    isKeyblockAvailable,
  }
})
