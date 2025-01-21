import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'

export const useKeyblockStore = defineStore('keyblocks', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawKeyblocks = ref(null)
  const keyblocksCount = ref(null)

  const keyblocks = computed(() => {
    return rawKeyblocks.value
      ? adaptKeyblocks(rawKeyblocks.value)
      : null
  })

  async function fetchKeyblocks({ queryParameters, limit } = {}) {
    rawKeyblocks.value = null
    const defaultParameters = `/v3/key-blocks?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawKeyblocks.value = data
    keyblocksCount.value = data.data[0].height
  }

  return {
    keyblocks,
    keyblocksCount,
    fetchKeyblocks,
  }
})
