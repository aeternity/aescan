import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useChartsStore = defineStore('charts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const transactionsStatistics = ref(null)

  async function fetchTransactionsStatistics(interval, limit, customInterval, txType) {
    transactionsStatistics.value = null

    const intervalSlug = customInterval
      ? `?min_start_date=${customInterval.minStart}&max_start_date=${customInterval.maxStart}&limit=1000`
      : `?interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const typeSlug = txType ? '&tx_type=' + txType : ''

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions${intervalSlug + typeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    transactionsStatistics.value = customInterval ? data.data.reverse() : data.data.slice(1).reverse()
  }

  return {
    transactionsStatistics,
    fetchTransactionsStatistics,
  }
})
