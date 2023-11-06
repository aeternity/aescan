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

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
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

  async function fetchTransactionsStatistics(slug) {
    transactionsStatistics.value = null
    // https://staging.mdw.mainnet.aeternity.io/mdw/v3/statistics/transactions?min_start_date=2023-03-02&max_start_date=2023-03-03&direction=forward
    const { data } = await axios.get(`https://staging.mdw.mainnet.aeternity.io/mdw/v3/statistics/transactions${slug || '?limit=8&interval_by=day'}`)
    transactionsStatistics.value = data.data.reverse()
  }

  return {
    rawTransactions,
    transactionsCount,
    transactions,
    fetchTransactions,
    fetchTransactionsCount,
    transactionsStatistics,
    fetchTransactionsStatistics,
  }
})
