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
  const selectedTxType = ref(undefined)
  const selectedScope = ref(undefined)
  const pageLimit = ref(null)
  const params = ref(null)

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  const hasInterval = computed(() =>
    !!params.value?.scope,
  )
  const hasType = computed(() =>
    !!params.value?.txType,
  )

  const slug = computed(() => {
    // todo condition
    // todo has parameters
    const isTyp = hasType.value || !!selectedTxType.value
    const isInt = hasInterval.value || !!selectedScope.value

    if (isInt || isTyp) {
      const array = [
        intervalSlug.value,
        typeSlug.value,
      ]
        .filter(Boolean)
      return array ? `?${array.join('&')}` : null
    } else {
      return ''
    }
  })

  const typeSlug = computed(() => {
    return selectedTxType.value?.typeQuery !== undefined ? `${'txType=' + selectedTxType.value.typeQuery}` : null
  })

  const intervalSlug = computed(() => {
    // todo condition
    const cond = hasInterval.value || !!selectedScope.value
    if (cond) {
      return formatDateToParameters(
        selectedScope.value?.maxStart,
        selectedScope.value?.minStart,
      )
    } else {
      return null
    }
  })

  function changeRoute() {
    push(`/transactions${slug.value}`)
  }

  function getParams() {
    const { txType, scope } = route.query
    params.value = route.query
    const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
    const typeSlug = txTypeOption?.typeQuery
    return [typeSlug, scope]
  }

  function setComponentState() {
    selectedTxType.value = hasType.value
      ? TX_TYPES_OPTIONS.find(option => option.typeQuery === params.value.txType)
      : null
    selectedScope.value = hasInterval.value
      ? formatParametersToDateObject(params.value.scope)
      : null
  }

  async function loadTransactions(queryParameters) {
    // todo only if comming direct url
    getParams()

    setComponentState()
    await fetchTransactions({
      queryParameters,
      scope: selectedScope.value,
      type: selectedTxType.value?.typeQuery,
      limit: pageLimit.value,
    })

    // await fetchTransactions({
    //   queryParameters,
    //   scope: params.value.scope,
    //   type: params.value.txType,
    //   limit: pageLimit.value,
    // })

    await fetchTransactionsCount(params.value.txType)

    setPageIndex(1)
  }

  async function fetchTransactions({ queryParameters, scope, type, limit } = {}) {
    const bbb = formatDateToParameters(scope.customInterval.minStart, scope.customInterval.maxStart)
    const ccc = bbb.substring(6)
    rawTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      isHydrated.value = true
      rawTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/transactions`)

    transactionsUrl.searchParams.append('limit', limit.value ?? 10)

    if (scope) {
      transactionsUrl.searchParams.append('scope', ccc)
    }

    if (type) {
      transactionsUrl.searchParams.append('type', type)
    }

    const { data } = await axios.get(transactionsUrl.toString())
    isHydrated.value = true
    rawTransactions.value = data
  }

  async function fetchTransactionsCount(txType = null) {
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

  function formatParametersToDateObject(timeString) {
    const parameters = timeString.split(':')[1].split('-')
    return {
      customInterval: {
        minStart: DateTime.fromSeconds(parseInt(parameters[0])),
        maxStart: DateTime.fromSeconds(parseInt(parameters[1])),
      },
    }
  }

  function formatDateToParameters(minStart, maxStart) {
    const from = DateTime.fromISO(maxStart).toSeconds()
    const to = DateTime.fromISO(minStart).toSeconds()
    return `scope=time:${from}-${to}`
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
