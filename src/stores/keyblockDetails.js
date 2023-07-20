import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptKeyblock } from '@/utils/adapters'

export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawKeyblock = ref(null)
  const keyblockDeltaStats = ref(null)

  const keyblockDetails = computed(() => {
    return rawKeyblock.value?.hash ? adaptKeyblock(rawKeyblock.value, keyblockDeltaStats.value) : rawKeyblock.value
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
  }
})
