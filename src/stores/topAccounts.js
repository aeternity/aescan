import { useBlockchainStatsStore } from '~/stores/blockchainStats'

export const useTopAccountsStore = defineStore('topAccounts', () => {
  const axios = useAxios()
  const rawTopAccounts = ref(null)
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const blockchainStatsStore = useBlockchainStatsStore()

  const topAccounts = computed(() =>
    rawTopAccounts.value && distribution.value
      ? adaptTopAccounts(rawTopAccounts.value, distribution.value)
      : null,
  )

  const distribution = computed(() =>
    blockchainStatsStore.totalTokenSupply && blockchainStatsStore.burnedCount
      ? Number(blockchainStatsStore.totalTokenSupply) + Number(blockchainStatsStore.burnedCount)
      : null,
  )

  async function fetchTopAccounts() {
    rawTopAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/wealth`)
    rawTopAccounts.value = data
  }

  return {
    topAccounts,
    fetchTopAccounts,
  }
})
