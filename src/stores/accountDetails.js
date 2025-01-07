import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { useMarketStatsStore } from '@/stores/marketStats'
import { adaptAccountActivities, adaptAccountTokens, adaptTransactions } from '@/utils/adapters'
import { useDexStore } from '@/stores/dex'

export const useAccountStore = defineStore('account', () => {
  const {
    MIDDLEWARE_URL,
    NODE_URL,
  } = useRuntimeConfig().public
  const { price: aeFiatPrice } = storeToRefs(useMarketStatsStore())
  const axios = useAxios()
  const { fetchPrice } = useDexStore()

  const accountDetails = ref(null)
  const totalAccountTransactionsCount = ref(null)
  const selectedKeyblock = ref(null)
  const selectedMicroblock = ref(null)
  const selectedKeyblockMicroblocks = ref(null)
  const selectedMicroblockTransactions = ref(null)
  const rawAccountNames = ref(null)
  const rawAccountActivities = ref(null)
  const rawAccountTokens = ref(null)
  const rawAccountTransactions = ref(null)
  const tokenPrices = ref({})
  const accountNames = ref({})

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

  const accountTokens = computed(() =>
    rawAccountTokens.value
      ? adaptAccountTokens(rawAccountTokens.value, tokenPrices.value, aeFiatPrice.value)
      : null,
  )

  async function fetchAccount(accountId, { limit } = {}) {
    await Promise.all([
      fetchAccountDetails(accountId),

      Promise.allSettled([
        fetchAccountTokens({ accountId, limit }),
        fetchAccountTransactions({ accountId, limit }),
        fetchTotalAccountTransactionsCount(accountId),
        fetchAccountNames({ accountId, limit }),
        fetchAccountActivities({ accountId, limit }),
      ]),
    ])
    return true
  }

  async function fetchAccountDetails(accountId) {
    accountDetails.value = null
    const data = await $fetch('/api/account/detail', {
      params: {
        id: accountId,
      },
    })
    accountDetails.value = data
  }

  async function fetchTotalAccountTransactionsCount(accountId) {
    totalAccountTransactionsCount.value = null
    const data = await $fetch('/api/account/txcount', {
      params: {
        id: accountId,
      },
    })

    totalAccountTransactionsCount.value = data
    console.log('totalAccountTransactionsCount.value', totalAccountTransactionsCount.value)
  }

  async function fetchAccountNames({ accountId, queryParameters, limit } = {}) {
    accountNames.value = null
    const data = await $fetch('/api/account/names', {
      params: {
        accountId,
        queryParameters,
        limit,
      },
    })
    accountNames.value = data
  }

  async function fetchAccountTokens({ accountId, queryParameters, limit } = {}) {
    rawAccountTokens.value = null
    const defaultParameters = `/v3/accounts/${accountId}/aex9/balances?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawAccountTokens.value = data

    if (rawAccountTokens.value?.data.length) {
      await fetchAccountTokensPrices()
    }
  }

  async function fetchAccountTokensPrices() {
    // todo this should happen on server side
    // todo possibly move to mdw
    tokenPrices.value = {}
    await Promise.all(
      rawAccountTokens.value.data.map(async token => {
        const price = await fetchPrice(token.contractId, token.decimals)
        if (price) {
          tokenPrices.value[token.contractId] = price
        }
      }),
    )
  }

  async function fetchAccountActivities({ accountId, limit, queryParameters } = {}) {
    rawAccountActivities.value = null
    const defaultParameters = `/v3/accounts/${accountId}/activities?limit=${limit ?? 10}`
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

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v3/transactions`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', limit ?? 10)

    if (accountId) {
      transactionsUrl.searchParams.append('sender_id', accountId)
    }

    if (type) {
      transactionsUrl.searchParams.append('type', type)
    }

    const { data } = await axios.get(transactionsUrl.toString())
    rawAccountTransactions.value = data
  }

  return {
    totalAccountTransactionsCount,
    // todo shorten name totalAccountTransactionsCount
    selectedKeyblock,
    selectedMicroblock,
    selectedKeyblockMicroblocks,
    selectedMicroblockTransactions,
    rawAccountNames,
    rawAccountActivities,
    rawAccountTransactions,
    rawAccountTokens,
    accountDetails,
    accountActivities,
    accountTransactions,
    accountNames,
    accountTokens,
    tokenPrices,
    fetchAccount,
    fetchAccountActivities,
    fetchTotalAccountTransactionsCount,
    fetchAccountTransactions,
    fetchAccountNames,
    fetchAccountTokens,
  }
})
