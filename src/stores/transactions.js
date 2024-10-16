import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { ref } from 'vue'
import useAxios from '@/composables/useAxios'
import { adaptTransactions } from '@/utils/adapters'
import { formatAePrice, formatAettosToAe } from '@/utils/format'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

export const useTransactionsStore = defineStore('transactions', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawTransactions = ref(null)
  const transactionsCount = ref(null)
  const transactionsStatistics = ref(null)
  const last24hsTransactionsCount = ref(null)
  const last24hsTransactionsTrend = ref(null)
  const last24hsAverageTransactionFees = ref(null)
  const feesTrend = ref(null)
  const isHydrated = ref(null)
  const pageIndex = ref(1)
  const selectedTxType = ref(TX_TYPES_OPTIONS[0])

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  async function fetchTransactions(queryParameters = null) {
    const slug = `?${queryParameters.substring(3).split('?')[1]}`
    rawTransactions.value = null
    console.log('slug', slug)
    const data = await $fetch(`/api/transactions${slug}`)
    isHydrated.value = true
    rawTransactions.value = data
  }

  async function fetchTransactionsCount(txType = null) {
    transactionsCount.value = null
    const url = txType ? `${MIDDLEWARE_URL}/v3/transactions/count?tx_type=${txType}` : `${MIDDLEWARE_URL}/v3/transactions/count`
    const { data } = await axios.get(url)
    transactionsCount.value = data
  }

  async function fetchLast24hsTransactionsStatistics() {
    last24hsTransactionsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
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
