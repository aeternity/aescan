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
    const slugParts = [scopeSlug.value, typeSlug.value].filter(Boolean)
    return slugParts.length ? `?${slugParts.join('&')}` : ''
  })

  const typeSlug = computed(() =>
    selectedTxType.value?.typeQuery
      ? `txType=${selectedTxType.value.typeQuery}`
      : null,
  )

  const scopeSlug = computed(() =>
    selectedScope.value
      ? `scope=${selectedScope.value[0]}-${selectedScope.value[1]}`
      : null,
  )

  function changeRoute() {
    push(`/transactions${slug.value}`)
  }

  function setUrlParametersToStore() {
    const { scope, txType } = route.query
    const [min, max] = scope ? scope.split('-') : [null, null]
    // todo format separate fxs

    selectedTxType.value = txType
      ? TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
      : TX_TYPES_OPTIONS[0]
    selectedScope.value = scope
      ? [min, max]
      : null
  }

  async function loadTransactions(queryParameters) {
    setUrlParametersToStore()

    const type = selectedTxType.value?.typeQuery
    const scope = selectedScope.value ? `time:${selectedScope.value[0]}-${selectedScope.value[1]}` : null

    await Promise.all([
      fetchTransactions({ queryParameters, scope, type, limit: pageLimit.value }),
      fetchTransactionsCount({ scope, type }),
    ])
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
