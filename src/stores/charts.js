import { defineStore } from 'pinia'
// todo abstract stats api, reuse code

export const useChartsStore = defineStore('charts', () => {
  const transactionsStatistics = ref(null)
  const keyblocksStatistics = ref(null)
  const contractsStatistics = ref(null)
  const namesStatistics = ref(null)
  const difficultyStatistics = ref(null)

  async function fetchTransactionsStatistics(interval, limit, customInterval, txType) {
    transactionsStatistics.value = null
    transactionsStatistics.value = await $fetch('/api/charts/transactions',
      { params: { interval, limit, customInterval, txType } })
  }

  async function fetchKeyblocksStatistics(interval, limit, customInterval) {
    keyblocksStatistics.value = null
    keyblocksStatistics.value = await $fetch('/api/charts/keyblocks',
      { params: { interval, limit, customInterval } })
  }

  async function fetchContractsStatistics(interval, limit, customInterval) {
    contractsStatistics.value = null
    contractsStatistics.value = await $fetch('/api/charts/contracts',
      { params: { interval, limit, customInterval } })
  }

  async function fetchNamesStatistics(interval, limit, customInterval) {
    namesStatistics.value = null
    namesStatistics.value = await $fetch('/api/charts/names',
      { params: { interval, limit, customInterval } })
  }

  async function fetchDifficultyStatistics(interval, limit, customInterval) {
    difficultyStatistics.value = null
    difficultyStatistics.value = await $fetch(
      '/api/charts/difficulty', {
        params: {
          interval,
          limit,
          customInterval
        }
      })
  }

  return {
    keyblocksStatistics,
    transactionsStatistics,
    contractsStatistics,
    namesStatistics,
    difficultyStatistics,
    fetchKeyblocksStatistics,
    fetchTransactionsStatistics,
    fetchContractsStatistics,
    fetchNamesStatistics,
    fetchDifficultyStatistics,
  }
})
