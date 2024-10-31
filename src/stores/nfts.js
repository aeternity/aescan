import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useNftsStore = defineStore('nfts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const nfts = ref(null)
  const nftsCount = ref(null)

  function fetchNfts(queryParameters) {
    return Promise.allSettled([
      fetchNftsList(queryParameters),
      fetchNftsCount(),
    ])
  }


  // todo naming list
  async function fetchNftsList({ queryParameters, limit } = {}) {
    nfts.value = null
    const data = await $fetch(`/api/nfts`, {params: {limit, queryParameters}})
    nfts.value = data
  }

  // todo list a count soplecne nebo ne?
  async function fetchNftsCount() {
    nftsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/aex141/count`)
    nftsCount.value = data.data
  }

  return {
    nftsCount,
    nfts,
    fetchNfts,
    fetchNftsList,
  }
})
