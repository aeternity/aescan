import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptTransactions } from '@/utils/adapters'

export const useTransactionsStore = defineStore('transactions', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const rawTransactions = ref(null)
  const transactionsCount = ref(null)

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

  return {
    rawTransactions,
    transactionsCount,
    transactions,
    fetchTransactions,
    fetchTransactionsCount,
  }
})
