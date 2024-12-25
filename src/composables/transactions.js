import { useRoute, useRuntimeConfig } from 'nuxt/app'
import { computed, ref } from 'vue'
import useAxios from '@/composables/useAxios'
import { adaptTransactions } from '@/utils/adapters'
import { formatAePrice, formatAettosToAe } from '@/utils/format'
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

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  const slug = computed(() => {
    console.log('scopeSlug.value', scopeSlug.value)
    const slugParts = [scopeSlug.value, typeSlug.value].filter(Boolean)
    console.log('slugParts', slugParts)
    return slugParts.length ? `?${slugParts.join('&')}` : ''
  })

  const typeSlug = computed(() => {
    return selectedTxType.value?.typeQuery
      ? `txType=${selectedTxType.value.typeQuery}`
      : null
  })

  // todo do i need return
  const scopeSlug = computed(() => {
    // todo swapped params fix!
    return selectedScope.value
      ? formatScopeToParameters(
        selectedScope.value[1],
        selectedScope.value[0],
      )
      : null
  })

  function changeRoute() {
    console.log('slug.value', slug.value)
    push(`/transactions${slug.value}`)
  }

  // todo naming scope vs interval

  function setUrlParametersToStore() {
    const { scope, txType } = route.query

    // todo mozna konverze uz tady

    selectedTxType.value = txType
      ? TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
      : TX_TYPES_OPTIONS[0]
    selectedScope.value = scope
      ? formatParametersToScopeObject(scope)
      : null
  }

  // todo check params are not swapped
  function formatScopeToParameters(minStart, maxStart) {
    console.log('formatScopeToParameters', minStart, maxStart)
    if (minStart && maxStart) {
      const from = maxStart
      const to = minStart
      return `scope=time:${from}-${to}`
    } else {
      return null
    }
  }

  function formatParametersToScopeObject(scopeString) {
    const parameters = scopeString.split(':')[1].split('-')
    return [parameters[0], parameters[1]]
  }

  async function loadTransactions(queryParameters) {
    setUrlParametersToStore()
    const scopeString = scopeSlug.value ? scopeSlug.value.substring(6) : null
    await fetchTransactions({
      queryParameters,
      scope: scopeString,
      type: selectedTxType.value?.typeQuery,
      limit: pageLimit.value,
    })

    await fetchTransactionsCount({
      scope: scopeString,
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
      url.searchParams.append('scope', scope)
    }

    if (type) {
      url.searchParams.append('type', type)
    }

    const { data } = await axios.get(url.toString())
    isHydrated.value = true
    rawTransactions.value = data
  }

  async function fetchTransactionsCount({ scope, type }) {
    console.log('fetchTransactionsCount scope', scope)
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
