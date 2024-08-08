import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useKeyblockStore = defineStore('keyblocks', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const keyblocks = ref(null)

  async function fetchKeyblocks() {
    keyblocks.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/key-blocks`)
    console.log('data', data)
    keyblocks.value = data
  }

  return {
    keyblocks,
    fetchKeyblocks,
  }
})
