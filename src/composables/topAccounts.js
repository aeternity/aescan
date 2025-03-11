export const useTopAccountsStore = defineStore('topAccounts', () => {
  const axios = useAxios()
  const rawTopAccounts = ref(null)
  const activeAccountsCount = ref(null)
  const totalAccountsCount = ref(null)
  const activeAccountsDelta = ref(null)
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const blockchainStatsStore = useBlockchainStatsStore()
  const { fetchTotalStats } = blockchainStatsStore

  const topAccounts = computed(() =>
    rawTopAccounts.value && blockchainStatsStore.totalTokenSupply
      ? adaptTopAccounts(rawTopAccounts.value, blockchainStatsStore.totalTokenSupply)
      : null,
  )

  function fetchTopAccounts() {
    return Promise.allSettled([
      fetchAccounts(),
      fetchTotalStats(),
      fetchActiveAccountsCount(),
      fetchTotalAccountsCount(),
    ])
  }

  async function fetchAccounts() {
    rawTopAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/wealth`)
    rawTopAccounts.value = data
  }

  async function fetchActiveAccountsCount() {
    activeAccountsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/active-accounts?limit=2`)
    activeAccountsCount.value = data.data[0].count
    const prevTotalAccountCount = data.data[1].count
    activeAccountsDelta.value = (100 - (prevTotalAccountCount * 100 / activeAccountsCount.value)).toFixed(2)
  }

  async function fetchTotalAccountsCount() {
    totalAccountsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/total-accounts?interval_by=month&limit=1000`)
    totalAccountsCount.value = data.data.reduce((total, item) => total + parseInt(item.count), 0)
  }

  return {
    fetchTopAccounts,
    topAccounts,
    activeAccountsCount,
    totalAccountsCount,
    activeAccountsDelta,
  }
})
