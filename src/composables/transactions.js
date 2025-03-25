import { useRoute, useRuntimeConfig } from 'nuxt/app'
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'
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
    const scope = formatScopeSlug(selectedScope.value)
    const type = formatTypeSlug(selectedTxType.value)
    return formatSlug(scope, type)
  })

  function setUrlParametersToStore() {
    const { scope, txType } = route.query
    selectedTxType.value = formatUrlToTypeObject(txType)
    selectedScope.value = formatUrlToScopeObject(scope)
  }

  function changeRoute() {
    push(`/transactions${slug.value}`)
  }

  async function loadTransactions(queryParameters) {
    setUrlParametersToStore()

    const type = formatMDWTypeSlug(selectedTxType.value)
    const scope = formatMDWScopeSlug(selectedScope.value)

    await Promise.all([
      fetchTransactions({ queryParameters, scope, type, limit: pageLimit.value }),
      fetchTransactionsCount({ scope, type }),
    ])
  }

  async function fetchTransactions({ queryParameters, scope, type, limit } = {}) {
    rawTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters.substring(3)}`)
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
      url.searchParams.append('type', type.replace('-', '_'))
    }
    const { data } = await axios.get(url.toString())
    isHydrated.value = true
    rawTransactions.value = data
  }

  async function fetchTransactionsCount({ scope, type }) {
    transactionsCount.value = null

    const url = new URL(`${MIDDLEWARE_URL}/stats/transactions/total`)

    if (scope) {
      const scopeDate = formatScopeMilisecondsToScopeDate(scope)
      url.searchParams.append('min_start_date', scopeDate[0])
      url.searchParams.append('max_start_date', scopeDate[1])
    }

    if (type) {
      url.searchParams.append('tx_type', type)
    }

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

  function formatSlug(scope, type) {
    const slugParts = [scope, type].filter(Boolean)
    return slugParts.length ? `?${slugParts.join('&')}` : ''
  }

  function formatScopeSlug(scope) {
    return scope ? `scope=${scope[0]}-${scope[1]}` : null
  }

  function formatScopeMilisecondsToScopeDate(scope) {
    const [min, max] = formatUrlToScopeObject(scope.substring(5))

    return [
      DateTime.fromSeconds(parseInt(min)).toISODate(),
      DateTime.fromSeconds(parseInt(max)).toISODate(),
    ]
  }

  function formatTypeSlug(txType) {
    return txType?.typeQuery ? `txType=${txType.typeQuery}` : null
  }

  function formatUrlToTypeObject(txType) {
    return txType
      ? TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
      : TX_TYPES_OPTIONS[0]
  }

  function formatUrlToScopeObject(scope) {
    if (!scope) {
      return null
    }
    const [min, max] = scope.split('-')
    return [min, max]
  }

  function formatMDWScopeSlug(scope) {
    return scope ? `time:${scope[0]}-${scope[1]}` : null
  }

  function formatMDWTypeSlug(selectedTxType) {
    return selectedTxType?.typeQuery
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
    selectedTxType,
    selectedScope,
    setPageLimit,
  }
})
