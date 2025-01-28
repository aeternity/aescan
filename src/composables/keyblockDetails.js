import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const keyblockDeltaStats = ref(null)
  const keyblockMicroblocks = ref(null)
  const keyblockDetails = ref(null)

  async function fetchKeyblock(keyblockId) {
    keyblockDetails.value = null
    const data = await $fetch(`/api/keyblocks/${keyblockId}`)
    // todo splelling 2 words?
    keyblockDetails.value = data
  }

  async function fetchKeyblockMicroblocks({ queryParameters, limit, microblockHash, keyblockHash } = {}) {
    keyblockMicroblocks.value = null

    const data = await $fetch('/api/keyblocks/microblocks', {
      params: { microblockHash, limit, queryParameters, keyblockHash },
    })
    keyblockMicroblocks.value = data
  }

  async function isKeyblockAvailable(keyblockHash) {
    const data = await $fetch('/api/keyblocks/is-available', {
      params: { keyblockHash },
    })
    return data
  }

  return {
    keyblockDeltaStats,
    keyblockDetails,
    fetchKeyblock,
    fetchKeyblockMicroblocks,
    keyblockMicroblocks,
    isKeyblockAvailable,
  }
})
