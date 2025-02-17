export const useMinersStore = defineStore('miners', () => {
  const miners = ref(null)
  const topMiners = ref(null)
  const statistics = ref(null)
  // todo rename

  // todo loading like txs
  async function fetchMining() {
    statistics.value = null
    statistics.value = await $fetch('/api/mining/statistics')
  }

  async function fetchMiners({ queryParameters, limit } = {}) {
    miners.value = null
    miners.value = await $fetch('/api/mining/miners', {
      params: { queryParameters, limit },
    })
  }

  async function fetchTopMiners({ queryParameters, limit } = {}) {
    topMiners.value = null
    topMiners.value = await $fetch('/api/mining/top', {
      params: { queryParameters, limit },
    })
  }

  return {
    statistics,
    miners,
    topMiners,

    fetchMining,
    fetchMiners,
    fetchTopMiners,
  }
})
