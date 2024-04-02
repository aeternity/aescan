import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useChartsStore = defineStore('charts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const transactionsStatistics = ref(null)

  async function fetchTransactionsStatistics(interval, limit, range, txType) {
    transactionsStatistics.value = null

    const timeSlug = range
      ? `?min_start_date=${range.minStart}&max_start_date=${range.maxStart}&limit=1000`
      : `?interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const slug = txType ? timeSlug + '&tx_type=' + txType : timeSlug
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions${slug}`)

    // remove last interval from the response not to show current interval that is being built
    transactionsStatistics.value = range ? data.data.reverse() : data.data.slice(1).reverse()
  }

  return {
    transactionsStatistics,
    fetchTransactionsStatistics,
  }
})
