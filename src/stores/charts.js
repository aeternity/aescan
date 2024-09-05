import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

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

    const intervalSlug = customInterval
      ? `?min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=1000`
      : `?interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/blocks${intervalSlug}&type=key`)
    // remove last interval from the response not to show current interval that is being built
    keyblocksStatistics.value = customInterval ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchContractsStatistics(interval, limit, customInterval) {
    contractsStatistics.value = null

    const intervalSlug = customInterval
      ? `&min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=1000`
      : `&interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/transactions?tx_type=contract_call${intervalSlug}`)

    // remove last interval from the response not to show current interval that is being built
    contractsStatistics.value = customInterval ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchNamesStatistics(interval, limit, customInterval) {
    namesStatistics.value = null

    const intervalSlug = customInterval
      ? `?min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=100`
      : `?interval_by=${interval}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/names${intervalSlug}`)

    // remove last interval from the response not to show current interval that is being built
    namesStatistics.value = customInterval ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchDifficultyStatistics(interval, limit, customInterval) {
    difficultyStatistics.value = null

    const intervalSlug = customInterval
      ? `?min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=100`
      : `?interval_by=${interval}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/difficulty${intervalSlug}`)

    // remove last interval from the response not to show current interval that is being built
    difficultyStatistics.value = customInterval ? data.data.reverse() : data.data.slice(1).reverse()
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
