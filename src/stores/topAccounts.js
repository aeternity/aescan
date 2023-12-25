import { useBlockchainStatsStore } from '~/stores/blockchainStats'

export const useTopAccountsStore = defineStore('topAccounts', () => {
  const axios = useAxios()
  const rawTopAccounts = ref(null)
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const blockchainStatsStore = useBlockchainStatsStore()

  async function fetchTopAccounts() {
    rawTopAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/wealth`)
    rawTopAccounts.value = data
  }

  const distribution = computed(() =>
    blockchainStatsStore.totalTokenSupply && blockchainStatsStore.burnedCount
      ? Number(blockchainStatsStore.totalTokenSupply) + Number(blockchainStatsStore.burnedCount)
      : null,
  )

  const topAccounts = computed(() => {
    // console.log('1 blockchainStatsStore', blockchainStatsStore)
    // console.log('1 blockchainStatsStore.totalTokenSupply', blockchainStatsStore.totalTokenSupply.value)
    // console.log('1 blockchainStatsStore.burnedCount', blockchainStatsStore.burnedCount.value)

    return rawTopAccounts.value && distribution.value
      ? adaptTopAccounts(rawTopAccounts.value, distribution.value)
      : null
  })

  return {
    topAccounts,
    fetchTopAccounts,
    distribution,
  }
  // todo remove dis
})
