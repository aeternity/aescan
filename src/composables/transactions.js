import { useRoute, useRuntimeConfig } from 'nuxt/app'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

export const useTransactionsStore = defineStore('transactions', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const route = useRoute()
  const { push } = useRouter()

  const isHydrated = ref(false)
  const pageIndex = ref(1)
  const rawTransactions = ref(null)
  const transactionsCount = ref(null)
  const transactionsStatistics = ref(null)
  const last24hsTransactionsCount = ref(null)
  const last24hsTransactionsTrend = ref(null)
  const last24hsAverageTransactionFees = ref(null)
  const feesTrend = ref(null)
  const selectedTxType = ref(TX_TYPES_OPTIONS[0])
  const selectedScope = ref(null)
  const pageLimit = ref(null)
  const params = ref(null)

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  const slug = computed(() => {
    const slugParts = [scopeSlug.value, typeSlug.value].filter(Boolean)
    return slugParts.length ? `?${slugParts.join('&')}` : ''
  })

  const typeSlug = computed(() => {
    return selectedTxType.value?.typeQuery
      ? `txType=${selectedTxType.value.typeQuery}`
      : null
  })

  const scopeSlug = computed(() => {
    return selectedScope.value
      ? formatScopeToParameters(
        selectedScope.value?.maxStart ?? selectedScope.value?.customInterval?.maxStart,
        selectedScope.value?.minStart ?? selectedScope.value?.customInterval?.minStart,
      )
      : null
  })

  function changeRoute() {
    push(`/transactions${slug.value}`)
  }

  // todo naming scope vs interval

  function setUrlParametersToStore() {
    // todo as parameters, does not have to be store
    params.value = route.query
    const hasInterval = !!params.value?.scope
    const hasType = !!params.value?.txType
    // todo mozna konverze uz tady

    console.log('selectedScope', selectedScope)
    selectedTxType.value = hasType
      ? TX_TYPES_OPTIONS.find(option => option.typeQuery === params.value.txType)
      : TX_TYPES_OPTIONS[0]
    selectedScope.value = hasInterval
      ? formatParametersToScopeObject(params.value.scope)
      : null
  }

  async function loadTransactions(queryParameters) {
    setUrlParametersToStore()

    await fetchTransactions({
      queryParameters,
      scope: selectedScope.value,
      type: selectedTxType.value?.typeQuery,
      limit: pageLimit.value,
    })

    await fetchTransactionsCount({
      scope: selectedScope.value,
      type: selectedTxType.value?.typeQuery,
    })

    setPageIndex(1)
  }

  async function fetchTransactions({ queryParameters, scope, type, limit } = {}) {
    rawTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      isHydrated.value = true
      rawTransactions.value = data
      return
    }

    const url = new URL(`${MIDDLEWARE_URL}/transactions`)

    url.searchParams.append('limit', limit.value ?? 10)

    if (scope) {
      // todo try to move
      const bbb = formatScopeToParameters(scope.customInterval.minStart, scope.customInterval.maxStart)
      const ccc = bbb.substring(6)
      url.searchParams.append('scope', ccc)
    }

    if (type) {
      url.searchParams.append('type', type)
    }

    const { data } = await axios.get(url.toString())
    isHydrated.value = true
    rawTransactions.value = data
  }

  async function fetchTransactionsCount({ scope, type }) {
    transactionsCount.value = null
    const url = txType ? `${MIDDLEWARE_URL}/transactions/count?tx_type=${txType}` : `${MIDDLEWARE_URL}/transactions/count`
    const { data } = await axios.get(url)
    transactionsCount.value = data
  }

  async function fetchLast24hsTransactionsStatistics() {
    last24hsTransactionsCount.value = null
    try {
      const { data } = await axios.get(`${MIDDLEWARE_URL}/stats`)
      last24hsTransactionsCount.value = data.last24hsTransactions
      last24hsTransactionsTrend.value = data.transactionsTrend
      last24hsAverageTransactionFees.value = formatAePrice(formatAettosToAe(data.last24hsAverageTransactionFees), 6)
      feesTrend.value = data.feesTrend
    } catch {
      last24hsTransactionsCount.value = null
      last24hsTransactionsTrend.value = null
      last24hsAverageTransactionFees.value = null
      feesTrend.value = null
    }
  }

  function setPageIndex(index) {
    pageIndex.value = index
  }

  function setPageLimit(value) {
    pageLimit.value = value
  }

  function formatParametersToScopeObject(scopeString) {
    const parameters = scopeString.split(':')[1].split('-')

    return {
      customInterval: {
        minStart: DateTime.fromSeconds(parseInt(parameters[0])),
        maxStart: DateTime.fromSeconds(parseInt(parameters[1])),
      },
    }
  }

  function formatScopeToParameters(minStart, maxStart) {
    if (minStart && maxStart) {
      const from = DateTime.fromISO(maxStart).toSeconds()
      const to = DateTime.fromISO(minStart).toSeconds()
      return `scope=time:${from}-${to}`
    } else {
      return null
    }
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
    loadTransactions,
    changeRoute,
    feesTrend,
    isHydrated,
    pageIndex,
    selectedTxType,
    selectedScope,
    setPageIndex,
    setPageLimit,
  }
})
