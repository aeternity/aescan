import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptTransactions } from '@/utils/adapters'

export const useTransactionsStore = defineStore('transactions', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawTransactions = ref(null)
  const transactionsCount = ref(null)
  const transactionsStatistics = ref(null)
  const last24hsTransactionsCount = ref(null)
  const last24hsTransactionsTrend = ref(null)

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  async function fetchTransactions(queryParameters = null) {
    rawTransactions.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v3/transactions?limit=10'}`)
    rawTransactions.value = data
  }

  async function fetchTransactionsCount(txType = null) {
    transactionsCount.value = null
    const url = txType ? `${MIDDLEWARE_URL}/v2/txs/count?tx_type=${txType}` : `${MIDDLEWARE_URL}/v2/txs/count`
    const { data } = await axios.get(url)
    transactionsCount.value = data
  }

  async function fetchLast24hsTransactionsCount() {
    last24hsTransactionsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    last24hsTransactionsCount.value = data.last24hsTransactions
    last24hsTransactionsTrend.value = data.transactionsTrend
  }

  async function fetchTransactionsStatistics(interval = 'day', limit = 7, range) {
    transactionsStatistics.value = null

    const slug = range
      ? `?min_start_date=${range.minStart}&max_start_date=${range.maxStart}&limit=1000`
      : `?interval_by=${interval}&limit=${parseInt(limit) + 1}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions${slug}`)

    // remove last interval from the response not to show current interval that is being built
    transactionsStatistics.value = range ? data.data.reverse() : data.data.slice(1).reverse()
  }

  return {
    transactionsCount,
    transactions,
    fetchTransactions,
    fetchTransactionsCount,
    transactionsStatistics,
    fetchTransactionsStatistics,
    fetchLast24hsTransactionsCount,
    last24hsTransactionsCount,
    last24hsTransactionsTrend,
  }
})
