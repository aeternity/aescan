export const useTopAccountsStore = defineStore('topAccounts', () => {
  const axios = useAxios()
  const rawTopAccounts = ref(null)
  const activeAccountsCount = ref(null)
  const totalAccountsCount = ref(null)
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
      fetchActiveAccountsCount(),
      fetchTotalAccountsCount(),
    ])
  }

  async function fetchAccounts() {
    rawTopAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/wealth`)
    rawTopAccounts.value = data
  }

  async function fetchActiveAccountsCount() {
    activeAccountsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/active-accounts?limit=1`)
    activeAccountsCount.value = data.data[0].count
  }

  async function fetchTotalAccountsCount() {
    totalAccountsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/total-accounts?interval_by=month&limit=100`)
    // todo ask mdw for endpoint
    totalAccountsCount.value = data.data.reduce((total, item) => total + parseInt(item.count), 0)
  }

  function sumCounts(dataString) {
    // Parse the input string into an array of objects

    // Check if the parsing was successful
    if (!Array.isArray(dataArray)) {
      throw new TypeError('Invalid input: Expected a valid JSON array')
    }

    // Sum up all the counts using reduce()
    return dataArray.reduce((total, item) => total + parseInt(item.count), 0)
  }

  return {
    fetchTopAccounts,
    topAccounts,
    activeAccountsCount,
    totalAccountsCount,
  }
})
