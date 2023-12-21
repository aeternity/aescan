export const useTopAccountsStore = defineStore('topAccounts', () => {
  const axios = useAxios()
  const topAccounts = ref(null)
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  async function fetchTopAccounts() {
    topAccounts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/wealth`)
    topAccounts.value = data
  }

  return {
    topAccounts,
    fetchTopAccounts,
  }
})
