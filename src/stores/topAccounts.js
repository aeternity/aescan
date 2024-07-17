import { useBlockchainStatsStore } from '@/stores/blockchainStats'

export const useTopAccountsStore = defineStore('topAccounts', () => {
  const axios = useAxios()
  const rawTopAccounts = ref(null)
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const blockchainStatsStore = useBlockchainStatsStore()
  const { fetchTotalStats } = useBlockchainStatsStore()

  const topAccounts = computed(() =>
    rawTopAccounts.value && blockchainStatsStore.totalTokenSupply
      ? adaptTopAccounts(rawTopAccounts.value, blockchainStatsStore.totalTokenSupply)
      : null,
  )

  function fetchTopAccounts() {
    return Promise.allSettled([
      fetchAccounts(),
      fetchTotalStats(),
    ])
  }

  async function fetchAccounts() {
    rawTopAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/wealth`)
    rawTopAccounts.value = data
  }

  return {
    topAccounts,
    fetchTopAccounts,
  }
})
