export const useNamesStore = defineStore('names', () => {
  const activeNames = ref(null)
  const inAuctionNames = ref(null)
  const expiredNames = ref(null)
  const recentlyActivatedNames = ref(null)

  const auctionsEndingSoon = computed(() => inAuctionNames.value?.data.slice(0, 4))

  function fetchNames() {
    return Promise.all([
      fetchActiveNames(),
      fetchInAuctionNames(),
      fetchExpiredNames(),
    ])
  }

  async function fetchActiveNames(queryParameters) {
    activeNames.value = null
    activeNames.value = await $fetch('/api/names/active', {
      params: { queryParameters },
    })
  }

  async function fetchInAuctionNames(queryParameters) {
    inAuctionNames.value = null
    inAuctionNames.value = await $fetch('/api/names/auctions', {
      params: { queryParameters },
    })
  }

  async function fetchExpiredNames(queryParameters) {
    expiredNames.value = null
    expiredNames.value = await $fetch('/api/names/expired', {
      params: { queryParameters },
    })
  }

  async function fetchRecentlyActivatedNames() {
    recentlyActivatedNames.value = null
    recentlyActivatedNames.value = await $fetch('/api/names/recent')
  }

  return {
    activeNames,
    inAuctionNames,
    auctionsEndingSoon,
    expiredNames,
    recentlyActivatedNames,
    fetchNames,
    fetchActiveNames,
    fetchInAuctionNames,
    fetchExpiredNames,
    fetchRecentlyActivatedNames,
  }
})
