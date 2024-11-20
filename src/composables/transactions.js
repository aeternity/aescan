import { useRoute, useRuntimeConfig } from 'nuxt/app'
import { TX_TYPES_OPTIONS } from '@/utils/constants'

export const useTransactionsStore = defineStore('transactions', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const route = useRoute()
  const { push } = useRouter()
  const params = ref([null, null]) // todo default
  const isHydrated = ref(false)
  const pageIndex = ref(1)

  const rawTransactions = ref(null)
  const transactionsCount = ref(null)
  const transactionsStatistics = ref(null)
  const last24hsTransactionsCount = ref(null)
  const last24hsTransactionsTrend = ref(null)
  const last24hsAverageTransactionFees = ref(null)
  const feesTrend = ref(null)

  const selectedTxType = ref(null)
  const selectedRange = ref(null) // todo default

  // todo nemusi byt sotre value
  // const selectedTxType = ref(TX_TYPES_OPTIONS[0])
  // const selectedRange = ref('time:1731106800-1731020400') // todo default
  //
  const slug = computed(() => {
    const hasInterval = !!selectedRange.value?.customInterval
    const hasType = !!selectedTxType.value?.typeQuery

    if (hasInterval || hasType) {
      const from = hasInterval ? DateTime.fromISO(selectedRange.value.customInterval.maxStart).toSeconds() : null
      const to = hasInterval ? DateTime.fromISO(selectedRange.value.customInterval.minStart).toSeconds() : null
      const intervalString = hasInterval ? `scope=time:${from}-${to}` : null
      const typeString = hasType ? `${'txType=' + selectedTxType.value.typeQuery}` : null
      const array = [intervalString, typeString].filter(Boolean)
      const slug = array ? `?${array.join('&')}` : null
      return slug
    } else {
      return ''
    }
  })

  const transactions = computed(() =>
    rawTransactions.value
      ? adaptTransactions(rawTransactions.value)
      : null,
  )

  function changeRoute() {
    console.log(' changeRoute to slug.value', slug.value)
    // todo otaznicek sem
    push(`/transactions${slug.value}`)
  }

  function getParams() {
    // todo typestr here
    // todo setparams
    const { txType, scope } = route.query
    params.value = route.query
    const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
    return [txTypeOption, scope]
  }

  function setComponentState() {
    selectedTxType.value = TX_TYPES_OPTIONS.find(option => option.typeQuery === params.value.txType)

    const array = params.value.scope.split(':')[1].split('-')

    const customInterval = {
      customInterval: {
        minStart: DateTime.fromSeconds(parseInt(array[0])),
        maxStart: DateTime.fromSeconds(parseInt(array[1])),
      },
    }
    selectedRange.value = customInterval

    console.log('selectedRange.value', selectedRange.value)
  }

  async function loadTransactions(queryParameters) {
    // selected or params
    const [txTypeOption, scope] = getParams()
    console.log('1 read params', [txTypeOption, scope])

    const typestr = txTypeOption?.typeQuery
    console.log('params.value', params.value)

    // if comming direct url
    setComponentState()

    await fetchTransactions({
      queryParameters,
      range: params.value.scope,
      type: params.value.txType,
      limit: 10,
    })
    // todo unhardcode
    await fetchTransactionsCount(typestr)
    setPageIndex(1) // todo resolve page index
  }

  async function fetchTransactions({ queryParameters, range, type, limit } = {}) {
    rawTransactions.value = null
    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      isHydrated.value = true
      rawTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/transactions`)

    transactionsUrl.searchParams.append('limit', limit ?? 10)
    // todo range vs scope
    if (range) {
      transactionsUrl.searchParams.append('scope', range)
    }

    if (type) {
      transactionsUrl.searchParams.append('type', type)
    }

    const { data } = await axios.get(transactionsUrl.toString())
    isHydrated.value = true
    rawTransactions.value = data
    // todo atse to neduplikuje
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
    selectedRange,
    setPageIndex,
  }
})
