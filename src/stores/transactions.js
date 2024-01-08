import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { ref } from 'vue'
import useAxios from '@/composables/useAxios'
import { adaptTransactions } from '@/utils/adapters'
import { TX_TYPES_OPTIONS } from '~/utils/constants'

export const useTransactionsStore = defineStore('transactions', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawTransactions = ref(null)
  const transactionsCount = ref(null)
  const transactionsStatistics = ref(null)
  const isHydrated = ref(null)
  const pageIndex = ref(1)
  const selectedTxType = ref(TX_TYPES_OPTIONS[0])
  const last24hsTransactionsCount = ref(null)

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  async function fetchTransactions(queryParameters = null) {
    rawTransactions.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v2/txs?limit=10'}`)
    isHydrated.value = true
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
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/stats`)
    last24hsTransactionsCount.value = data.last24hsTransactions
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

  function setPageIndex(index) {
    pageIndex.value = index
  }

  function setSelectedTxType(txType) {
    selectedTxType.value = txType
  }

  return {
    transactionsCount,
    transactions,
    fetchTransactions,
    fetchTransactionsCount,
    transactionsStatistics,
    fetchTransactionsStatistics,
    isHydrated,
    pageIndex,
    selectedTxType,
    setPageIndex,
    setSelectedTxType,
    fetchLast24hsTransactionsCount,
    last24hsTransactionsCount,
  }
})
