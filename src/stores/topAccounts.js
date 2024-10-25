export const useTopAccountsStore = defineStore('topAccounts', () => {
  const topAccounts = ref(null)

  async function fetchTopAccounts() {
    topAccounts.value = null
    const data = await $fetch(`/api/wealth`)
    topAccounts.value = data
  }

  return {
    topAccounts,
    fetchTopAccounts,
  }
})
