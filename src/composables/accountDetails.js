import { isAddressValid } from '@aeternity/aepp-sdk'
import { useRuntimeConfig } from 'nuxt/app'

export const useAccountStore = defineStore('account', () => {
  const {
    MIDDLEWARE_URL,
    NODE_URL,
  } = useRuntimeConfig().public
  const { price: aeFiatPrice } = storeToRefs(useMarketStatsStore())
  const axios = useAxios()
  const { fetchPrice } = useDexStore()
  const featureFlags = useFeatureFlags()

  const rawAccountDetails = ref(null)
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

  const accountDetails = computed(() =>
    rawAccountDetails.value
      ? {
          ...rawAccountDetails.value,
          balance: formatAettosToAe(rawAccountDetails.value.balance),
          totalTransactionsCount: totalAccountTransactionsCount.value,
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

  const accountTokens = computed(() =>
    rawAccountTokens.value
      ? adaptAccountTokens(rawAccountTokens.value, tokenPrices.value, aeFiatPrice.value)
      : null,
  )

  async function fetchAccount(accountId = {}) {
    await Promise.all([
      fetchAccountDetails(accountId),

      Promise.allSettled([
        fetchAccountTokens({ accountId }),
        fetchAccountTransactions({ accountId }),
        fetchTotalAccountTransactionsCount(accountId),
        fetchAccountNames({ accountId }),
        fetchAccountActivities({ accountId }),
      ]),
    ])
    return true
  }

  async function fetchAccountDetails(accountId) {
    try {
      const { data } = await axios.get(`${NODE_URL}/accounts/${accountId}`)
      rawAccountDetails.value = data
    } catch (e) {
      if ([400, 404].includes(e.response.status)) {
        if (isAddressValid(accountId)) {
          rawAccountDetails.value = { id: accountId, isExistent: false }
        } else {
          throw showError({
            data: {
              entityId: accountId,
              entityName: 'Account',
            },
            statusMessage: 'EntityDetailsNotFound',
          })
        }
      }
    }
  }

  async function fetchTotalAccountTransactionsCount(accountId) {
    totalAccountTransactionsCount.value = null
    const txCountUrl = new URL(`${MIDDLEWARE_URL}/transactions/count`)
    txCountUrl.searchParams.append('id', accountId)
    const { data } = await axios.get(txCountUrl.toString())
    totalAccountTransactionsCount.value = data
  }

  async function fetchAccountNames({ accountId, queryParameters } = {}) {
    rawAccountNames.value = null
    const defaultParameters = `/names?owned_by=${accountId}&by=name&direction=forward&state=active&limit=10`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawAccountNames.value = data
  }

  async function fetchAccountTokens({ accountId, queryParameters } = {}) {
    rawAccountTokens.value = null
    const defaultParameters = `/accounts/${accountId}/aex9/balances?limit=10`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawAccountTokens.value = data

    if (rawAccountTokens.value?.data.length) {
      await fetchAccountTokensPrices()
    }
  }

  async function fetchAccountTokensPrices() {
    if (!featureFlags.dex) {
      return
    }

    tokenPrices.value = {}
    await Promise.all(
      rawAccountTokens.value.data.map(async (token) => {
        const price = await fetchPrice(token.contractId, token.decimals)
        if (price) {
          tokenPrices.value[token.contractId] = price
        }
      }),
    )
  }

  async function fetchAccountActivities({ accountId, queryParameters } = {}) {
    rawAccountActivities.value = null
    const defaultParameters = `/accounts/${accountId}/activities?limit=10`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawAccountActivities.value = data
  }

  async function fetchAccountTransactions({ accountId, type, queryParameters } = {}) {
    rawAccountTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      rawAccountTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/transactions`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', 10)

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
    rawAccountDetails,
    totalAccountTransactionsCount,
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
