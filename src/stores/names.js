import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptActiveNames, adaptExpiredNames, adaptInAuctionNames, adaptNames } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useNamesStore = defineStore('names', () => {
  const { blockHeight } = storeToRefs(useRecentBlocksStore())
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawActiveNames = ref(null)
  const rawInAuctionNames = ref(null)
  const rawExpiredNames = ref(null)
  const rawRecentlyActivatedNames = ref(null)
  const namesStatistics = ref(null)

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

  function fetchNamesDetails({ limit }) {
    return Promise.all([
      fetchActiveNames({ limit }),
      fetchInAuctionNames({ limit }),
      fetchExpiredNames({ limit }),
    ])
  }

  async function fetchActiveNames({ queryParameters, limit } = {}) {
    rawActiveNames.value = null
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || `/v2/names?state=active&expand=true&by=deactivation&direction=forward&limit=${limit ?? 10}`}`,
    )
    rawActiveNames.value = data
  }

  async function fetchInAuctionNames({ queryParameters, limit } = {}) {
    rawInAuctionNames.value = null
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || `/v2/names/auctions?by=expiration&direction=forward&limit=${limit ?? 10}`}`,
    )
    rawInAuctionNames.value = data
  }

  async function fetchExpiredNames({ queryParameters, limit } = {}) {
    rawExpiredNames.value = null
    const { data } = await axios.get(
      `${MIDDLEWARE_URL}${queryParameters || `/v2/names?state=inactive&expand=true&limit=${limit ?? 10}`}`,
    )
    rawExpiredNames.value = data
  }

  async function fetchRecentlyActivatedNames() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/names?state=active&by=activation&direction=backward&limit=4&expand=true&by=activation`)
    rawRecentlyActivatedNames.value = data.data
  }

  async function fetchNamesStatistics(slug) {
    namesStatistics.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/names${slug || '?limit=8&interval_by=day'}`)
    namesStatistics.value = data.data.reverse()
    // namesStatistics.value = data.data.slice(1).reverse()
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
    namesStatistics,
    fetchNamesDetails,
    fetchActiveNames,
    fetchInAuctionNames,
    fetchExpiredNames,
    fetchRecentlyActivatedNames,
    fetchNamesStatistics,
  }
})
