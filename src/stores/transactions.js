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
  const last24hsTransactionsTrend = ref(null)

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  async function fetchTransactions(queryParameters = null) {
    rawTransactions.value = null
     const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v3/transactions?limit=10'}`)
    isHydrated.value = true
    rawTransactions.value = data
  }

  async function fetchTransactionsCount(txType = null) {
    transactionsCount.value = null
    const url = txType ? `${MIDDLEWARE_URL}/v3/transactions/count?tx_type=${txType}` : `${MIDDLEWARE_URL}/v3/transactions/count`
    const { data } = await axios.get(url)
    transactionsCount.value = data
  }

  async function fetchLast24hsTransactionsCount() {
    last24hsTransactionsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    last24hsTransactionsCount.value = data.last24hsTransactions
    last24hsTransactionsTrend.value = data.transactionsTrend
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
    last24hsTransactionsTrend,
  }
})
