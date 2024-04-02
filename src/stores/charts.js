import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useChartsStore = defineStore('charts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const transactionsStatistics = ref(null)

  async function fetchTransactionsStatistics(interval = 'day', limit = 7, range, txType) {
    transactionsStatistics.value = null

    const slug = range
      ? `?min_start_date=${range.minStart}&max_start_date=${range.maxStart}&limit=1000`
      : `?interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const aaa = txType ? slug + '&tx_type=' + txType : slug
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions${aaa}`)

    // remove last interval from the response not to show current interval that is being built
    transactionsStatistics.value = range ? data.data.reverse() : data.data.slice(1).reverse()
  }

  return {
    transactionsStatistics,
    fetchTransactionsStatistics,
  }
})
