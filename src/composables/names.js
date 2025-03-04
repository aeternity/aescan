import { useRuntimeConfig } from 'nuxt/app'

export const useNamesStore = defineStore('names', () => {
  const { blockHeight } = storeToRefs(useRecentBlocksStore())
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawActiveNames = ref(null)
  const rawInAuctionNames = ref(null)
  const rawExpiredNames = ref(null)
  const rawRecentlyActivatedNames = ref(null)

  const activeNames = computed(() => {
    return rawActiveNames.value
      ? adaptActiveNames(rawActiveNames.value)
      : null
  })

  const inAuctionNames = computed(() => {
    return rawInAuctionNames.value
      ? adaptInAuctionNames(rawInAuctionNames.value)
      : null
  })

  const auctionsEndingSoon = computed(() => inAuctionNames.value?.data.slice(0, 4))

  const expiredNames = computed(() => {
    return rawExpiredNames.value
      ? adaptExpiredNames(rawExpiredNames.value)
      : null
  })

  const recentlyActivatedNames = computed(() => {
    return rawRecentlyActivatedNames.value
      ? adaptNames(rawRecentlyActivatedNames.value, blockHeight.value)
      : null
  })

  function fetchNamesDetails(limit) {
    return Promise.all([
      fetchActiveNames(),
      fetchInAuctionNames(),
      fetchExpiredNames(),
    ])
  }

  async function fetchActiveNames(queryParameters) {
    rawActiveNames.value = null
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || '/names?state=active&by=deactivation&direction=forward&limit=10'}`,
    )
    rawActiveNames.value = data
  }

  async function fetchInAuctionNames(queryParameters) {
    rawInAuctionNames.value = null
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || '/names/auctions?by=expiration&direction=forward&limit=10'}`,
    )
    rawInAuctionNames.value = data
  }

  async function fetchExpiredNames(queryParameters) {
    rawExpiredNames.value = null
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || '/names?state=inactive&limit=10'}`,
    )
    rawExpiredNames.value = data
  }

  async function fetchRecentlyActivatedNames() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/names?state=active&by=activation&direction=backward&limit=4&by=activation`)
    rawRecentlyActivatedNames.value = data.data
  }

  return {
    rawActiveNames,
    rawInAuctionNames,
    rawExpiredNames,
    rawRecentlyActivatedNames,
    activeNames,
    inAuctionNames,
    auctionsEndingSoon,
    expiredNames,
    recentlyActivatedNames,
    fetchNamesDetails,
    fetchActiveNames,
    fetchInAuctionNames,
    fetchExpiredNames,
    fetchRecentlyActivatedNames,
  }
})
