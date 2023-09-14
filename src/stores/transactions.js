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
  const dailyTransactions = ref(null)

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  const lastDayTransactionsCount = computed(() =>
    dailyTransactions.value
      ? dailyTransactions.value[0].count
      : null,
  )

  const lastDayTransactionsIncrement = computed(() =>
    dailyTransactions.value
      ? ((dailyTransactions.value[0].count - dailyTransactions.value[1].count) *
        100 / dailyTransactions.value[0].count).toFixed(2)
      : null,
  )

  async function fetchTransactions(queryParameters = null) {
    rawTransactions.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v2/txs?limit=10'}`)
    rawTransactions.value = data
  }

  async function fetchTransactionsCount(txType = null) {
    transactionsCount.value = null
    const url = txType ? `${MIDDLEWARE_URL}/v2/txs/count?tx_type=${txType}` : `${MIDDLEWARE_URL}/v2/txs/count`
    const { data } = await axios.get(url)
    transactionsCount.value = data
  }

  async function fetchDailyTransactions() {
    dailyTransactions.value = null
    const { data } = await axios.get('https://staging.mdw.mainnet.aeternity.io/mdw/v3/statistics/transactions?limit=2&interval_by=day')
    dailyTransactions.value = data.data
  }

  async function fetchTransactionsStatistics(slug) {
    transactionsStatistics.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions${slug || '?limit=8&interval_by=day'}`)
    transactionsStatistics.value = data.data.slice(1).reverse()
  }

  return {
    transactionsCount,
    transactions,
    fetchTransactions,
    fetchTransactionsCount,
    transactionsStatistics,
    fetchTransactionsStatistics,
    fetchDailyTransactions,
    lastDayTransactionsIncrement,
    lastDayTransactionsCount,
  }
})
