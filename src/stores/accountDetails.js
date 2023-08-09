import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptAccountNames, adaptTransactions, adaptAccountActivities } from '@/utils/adapters'
import { formatAettosToAe } from '@/utils/format'

export const useAccountStore = defineStore('account', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public

  const rawAccountDetails = ref(null)
  const accountTransactionsCount = ref(null)
  const totalAccountTransactionsCount = ref(null)
  const accountNamesCount = ref(null)
  const selectedKeyblock = ref(null)
  const selectedMicroblock = ref(null)
  const selectedKeyblockMicroblocks = ref(null)
  const selectedMicroblockTransactions = ref(null)
  const rawAccountNames = ref(null)
  const rawAccountActivities = ref(null)
  const rawAccountTransactions = ref(null)

  const accountDetails = computed(() =>
    rawAccountDetails.value
      ? {
        ...rawAccountDetails.value,
        balance: formatAettosToAe(rawAccountDetails.value.balance),
        transactionsCount: accountTransactionsCount.value,
        totalTransactionsCount: totalAccountTransactionsCount.value,
        namesCount: accountNamesCount.value,
        isGeneralized: rawAccountDetails.value.kind === 'generalized',
      }
      : null,
  )
  const accountActivities = computed(() =>
    rawAccountActivities.value
      ? adaptAccountActivities(rawAccountActivities.value)
      : null,
  )
  const accountTransactions = computed(() =>
    rawAccountTransactions.value
      ? adaptTransactions(rawAccountTransactions.value)
      : null,
  )
  const accountNames = computed(() =>
    rawAccountNames.value
      ? adaptAccountNames(rawAccountNames.value)
      : null,
  )

  function fetchAccount(accountId, { limit } = {}) {
    fetchAccountDetails(accountId)
    fetchAccountTransactions({ accountId, limit })
    fetchTotalAccountTransactionsCount(accountId)
    fetchAccountNames({ accountId, limit })
    fetchAccountNamesCount(accountId)
  }

  async function fetchAccountDetails(accountId) {
    try {
      const { data } = await axios.get(`${NODE_URL}/v3/accounts/${accountId}`)
      rawAccountDetails.value = data
    } catch (e) {
      if (e.response.status === 404) {
        rawAccountDetails.value = { id: accountId, notExistent: true }
      }
    }
  }

  async function fetchAccountTransactionsCount(accountId, txType = null) {
    accountTransactionsCount.value = null

    const params = txType ? `/${accountId}?type=${txType}` : `?id=${accountId}`
    const txCountUrl = new URL(`${MIDDLEWARE_URL}/v2/txs/count${params}`)

    const { data } = await axios.get(txCountUrl)

    accountTransactionsCount.value = data
  }

  async function fetchTotalAccountTransactionsCount(accountId) {
    totalAccountTransactionsCount.value = null
    const txCountUrl = new URL(`${MIDDLEWARE_URL}/v2/txs/count`)
    txCountUrl.searchParams.append('id', accountId)
    const { data } = await axios.get(txCountUrl.toString())
    totalAccountTransactionsCount.value = data
  }

  async function fetchAccountNames({ accountId, queryParameters, limit } = {}) {
    const defaultParameters = `/v2/names?owned_by=${accountId}&by=name&direction=forward&state=active&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawAccountNames.value = data
  }

  async function fetchAccountNamesCount(accountId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/names?owned_by=${accountId}&state=active`)
    accountNamesCount.value = data.data.length
  }

  async function fetchAccountActivities({ accountId, limit, queryParameters } = {}) {
    rawAccountActivities.value = null
    const defaultParameters = `/v2/accounts/${accountId}/activities?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawAccountActivities.value = data
  }

  async function fetchAccountTransactions({ accountId, type, limit, queryParameters } = {}) {
    rawAccountTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      rawAccountTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v2/txs`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', limit ?? 10)

    if (accountId) {
      transactionsUrl.searchParams.append('account', accountId)
    }

    if (type) {
      transactionsUrl.searchParams.append('type', type)
    }

    const { data } = await axios.get(transactionsUrl.toString())
    rawAccountTransactions.value = data
  }

  return {
    rawAccountDetails,
    accountTransactionsCount,
    totalAccountTransactionsCount,
    accountNamesCount,
    selectedKeyblock,
    selectedMicroblock,
    selectedKeyblockMicroblocks,
    selectedMicroblockTransactions,
    rawAccountNames,
    rawAccountActivities,
    rawAccountTransactions,
    accountDetails,
    accountActivities,
    accountTransactions,
    accountNames,
    fetchAccount,
    fetchAccountActivities,
    fetchTotalAccountTransactionsCount,
    fetchAccountTransactions,
    fetchAccountTransactionsCount,
    fetchAccountNames,
  }
})
