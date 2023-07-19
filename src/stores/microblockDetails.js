import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptMicroblock } from '@/utils/adapters'

export const useMicroblockDetailsStore = defineStore('microblockDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawMicroblock = ref(null)

  const microblockDetails = computed(() => {
    return rawMicroblock.value ? adaptMicroblock(rawMicroblock.value) : null
  })

  async function fetchMicroblock(microblockHash) {
    rawMicroblock.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/micro-blocks/${microblockHash}`)
    rawMicroblock.value = data
  }

  return {
    rawMicroblock,
    microblockDetails,
    fetchMicroblock,
  }
})
