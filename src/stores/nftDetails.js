import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useNftDetailsStore = defineStore('nftDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const nft = ref(null)

  async function fetchNft(contractId) {
    // todo naming
    // todo reset
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex141/${contractId}`)
    nft.value = data
  }

  return {
    nft,
    fetchNft,
  }
})
