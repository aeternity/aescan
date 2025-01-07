import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawKeyblock = ref(null)
  const keyblockDeltaStats = ref(null)
  const keyblockMicroblocks = ref(null)
  const keyblockDetails = ref(null)
  // const keyblockDetails = computed(() => {
  //   return rawKeyblock.value?.hash ? adaptKeyblock(rawKeyblock.value, keyblockDeltaStats.value) : rawKeyblock.value
  // })

  async function fetchKeyblock(keyblockId) {
    keyblockDetails.value = null
    const data = await $fetch(`/api/keyblocks/${keyblockId}`)
    // todo splelling 2 words?
    keyblockDetails.value = data
  }

  async function fetchKeyblockMicroblocks({ queryParameters, limit, microblockHash, keyblockHash } = {}) {
    keyblockMicroblocks.value = null

    const data = await $fetch('/api/keyblocks/microblocks', {
      params: {
        microblockHash, limit, queryParameters, keyblockHash,
      },
    })
    keyblockMicroblocks.value = data
  }

  async function isKeyblockAvailable(keyblockHash) {
    try {
      await axios.get(`${MIDDLEWARE_URL}/v3/key-blocks/${keyblockHash}`)
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
