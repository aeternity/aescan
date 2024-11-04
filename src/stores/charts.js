import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
// todo abstract stats api, reuse code

export const useChartsStore = defineStore('charts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const transactionsStatistics = ref(null)
  const keyblocksStatistics = ref(null)
  const contractsStatistics = ref(null)
  const namesStatistics = ref(null)
  const difficultyStatistics = ref(null)

  async function fetchTransactionsStatistics(interval, limit, customInterval, txType) {
    transactionsStatistics.value = null

    const intervalSlug = customInterval
      ? `?min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=1000`
      : `?interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const typeSlug = txType ? '&tx_type=' + txType : ''

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/transactions${intervalSlug + typeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    transactionsStatistics.value = customInterval ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchKeyblocksStatistics(interval, limit, customInterval) {
    keyblocksStatistics.value = null
    keyblocksStatistics.value =  await $fetch('/api/charts/keyblocks', { params: { interval, limit, customInterval } })
  }

  async function fetchContractsStatistics(interval, limit, customInterval) {
    contractsStatistics.value = null
    contractsStatistics.value = await $fetch('/api/charts/contracts', { params: { interval, limit, customInterval } })
  }

  async function fetchNamesStatistics(interval, limit, customInterval) {
    namesStatistics.value = null
    namesStatistics.value = await $fetch('/api/charts/names', { params: { interval, limit, customInterval } })
  }

  async function fetchDifficultyStatistics(interval, limit, customInterval) {
    difficultyStatistics.value = null
    difficultyStatistics.value = await $fetch('/api/charts/difficulty', { params: { interval, limit, customInterval } })
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
