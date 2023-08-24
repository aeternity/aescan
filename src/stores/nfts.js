import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useNftsStore = defineStore('nfts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawNfts = ref(null)
  const nftsCount = ref(null)

  const nfts = computed(() =>
    rawNfts.value,
  )

  async function fetchNfts(queryParameters = null) {
    rawNfts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v2/aex141?limit=10'}`)
    rawNfts.value = data
  }

  async function fetchNftsCount() {
    nftsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/count`)
    nftsCount.value = data
  }

  return {
    nftsCount,
    nfts,
    fetchNfts,
    fetchNftsCount,
  }
})
