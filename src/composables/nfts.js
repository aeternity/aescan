import { useRuntimeConfig } from 'nuxt/app'

export const useNftsStore = defineStore('nfts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawNfts = ref(null)
  const nftsCount = ref(null)

  function fetchNfts(queryParameters) {
    return Promise.allSettled([
      fetchNftsList(queryParameters),
      fetchNftsCount(),
    ])
  }

  const nfts = computed(() => {
    return rawNfts.value
      ? adaptNfts(rawNfts.value)
      : null
  })

  async function fetchNftsList({ queryParameters, limit } = {}) {
    rawNfts.value = null
    const defaultParameters = `/v3/aex141?limit=${limit || 10}&direction=backward&by=creation`
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || defaultParameters}`,
    )
    rawNfts.value = data
  }

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
