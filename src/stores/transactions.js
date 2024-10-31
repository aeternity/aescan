import { defineStore } from 'pinia'
import { ref } from 'vue'
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

export const useTransactionsStore = defineStore('transactions', () => {

  // todo there should not be any formatting in stores
  // todo there should not be any formatting in components
  const transactions = ref(null)
  const transactionsCount = ref(null)
  const transactionsStatistics = ref(null)
  const last24hsTransactionsCount = ref(null)
  const last24hsTransactionsTrend = ref(null)
  const last24hsAverageTransactionFees = ref(null)
  const feesTrend = ref(null)
  const isHydrated = ref(null)
  const pageIndex = ref(1)
  const selectedTxType = ref(TX_TYPES_OPTIONS[0])

  async function fetchTransactions(queryParameters = null) {
    // todo query params jako funguje?jakoze pagination
    transactions.value = null
    const slug = `?${queryParameters.substring(3).split('?')[1]}`
    const data = await $fetch(`/api/transactions${slug}`)
    isHydrated.value = true
    transactions.value = data
  }

  async function fetchTransactionsCount(txType = null) {
    transactionsCount.value = null
    const string = txType ? `/api/transactions/count?${txType}` : `/api/transactions/count`
    const data = await $fetch(string)
    transactionsCount.value = data
  }

  async function fetchLast24hsTransactionsStatistics() {
    last24hsTransactionsCount.value = null
    const data = await $fetch('/api/stats')
    last24hsTransactionsCount.value = data.last24hsTransactions
    last24hsTransactionsTrend.value = data.transactionsTrend
    last24hsAverageTransactionFees.value = formatAePrice(formatAettosToAe(data.last24hsAverageTransactionFees), 6)
    feesTrend.value = data.feesTrend
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
    fetchLast24hsTransactionsStatistics,
    last24hsTransactionsCount,
    last24hsTransactionsTrend,
    last24hsAverageTransactionFees,
    feesTrend,
    isHydrated,
    pageIndex,
    selectedTxType,
    setPageIndex,
    setSelectedTxType,
  }
})
