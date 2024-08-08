import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useKeyblockStore = defineStore('keyblocks', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawKeyblocks = ref(null)

  const keyblocks = computed(() => {
    return rawKeyblocks.value ?
      adaptKeyblocks(rawKeyblocks.value) :
      null
  })

  async function fetchKeyblocks() {
    rawKeyblocks.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/key-blocks`)
    console.log('data', data)
    rawKeyblocks.value = data
  }

  return {
    keyblocks,
    fetchKeyblocks,
  }
})
