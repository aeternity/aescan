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

  async function fetchActiveNames({ queryParameters, limit } = {}) {
    activeNames.value = null
    activeNames.value = await $fetch('/api/names/active', {
      params: { queryParameters, limit },
    })
  }

  async function fetchInAuctionNames({ queryParameters, limit } = {}) {
    inAuctionNames.value = null
    inAuctionNames.value = await $fetch('/api/names/auctions', {
      params: { queryParameters, limit },
    })
  }

  async function fetchExpiredNames({ queryParameters, limit } = {}) {
    expiredNames.value = null
    expiredNames.value = await $fetch('/api/names/expired', {
      params: { queryParameters, limit },
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
