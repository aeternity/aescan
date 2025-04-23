export const useMiningStore = defineStore('mining', () => {
  const miners = ref(null)
  const statistics = ref(null)

  const minersCount = computed(() => statistics.value?.minersCount)

  async function fetchMiningStatistics() {
    statistics.value = null
    statistics.value = await $fetch('/api/mining/statistics')
  }

  async function fetchMiners(queryParameters) {
    miners.value = null
    miners.value = await $fetch('/api/mining/miners', {
      params: { queryParameters },
    })
  }

  return {
    statistics,
    miners,
    minersCount,
    fetchMiningStatistics,
    fetchMiners,
  }
})
