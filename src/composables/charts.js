import { useRuntimeConfig } from 'nuxt/app'

export const useChartsStore = defineStore('charts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const transactionsStatistics = ref(null)
  const keyblocksStatistics = ref(null)
  const contractsStatistics = ref(null)
  const namesStatistics = ref(null)
  const difficultyStatistics = ref(null)
  const hashrateStatistics = ref(null)
  const accountsStatistics = ref(null)
  const priceStatistics = ref(null)

  async function fetchTransactionsStatistics(intervalBy, limit, scope, txType) {
    transactionsStatistics.value = null

    const scopeSlug = scope
      ? `?min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `?interval_by=${intervalBy}&limit=${parseInt(limit) + 1}`

    const typeSlug = txType ? '&tx_type=' + txType : ''

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/transactions${scopeSlug + typeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    transactionsStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchKeyblocksStatistics(intervalBy, limit, scope) {
    keyblocksStatistics.value = null

    const scopeSlug = scope
      ? `?min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `?interval_by=${intervalBy}&limit=${parseInt(limit) + 1}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/blocks${scopeSlug}&type=key`)
    // remove last interval from the response not to show current interval that is being built
    keyblocksStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchContractsStatistics(intervalBy, limit, scope) {
    contractsStatistics.value = null

    const scopeSlug = scope
      ? `&min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `&interval_by=${intervalBy}&limit=${parseInt(limit) + 1}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/transactions?tx_type=contract_call${scopeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    contractsStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchNamesStatistics(intervalBy, limit, scope) {
    namesStatistics.value = null

    const scopeSlug = scope
      ? `?min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `?interval_by=${intervalBy}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/names${scopeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    namesStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchDifficultyStatistics(intervalBy, limit, scope) {
    difficultyStatistics.value = null

    const scopeSlug = scope
      ? `?min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `?interval_by=${intervalBy}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/difficulty${scopeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    difficultyStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchHashrateStatistics(intervalBy, limit, scope) {
    hashrateStatistics.value = null

    const scopeSlug = scope
      ? `?min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `?interval_by=${intervalBy}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/hashrate${scopeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    hashrateStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchAccountsStatistics(intervalBy, limit, scope) {
    accountsStatistics.value = null

    const scopeSlug = scope
      ? `?min_start_date=${scope.minStart}&max_start_date=${scope.maxStart}&limit=1000`
      : `?interval_by=${intervalBy}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/active-accounts${scopeSlug}`)

    // remove last interval from the response not to show current interval that is being built
    accountsStatistics.value = scope ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchPriceStatistics(intervalBy) {
    priceStatistics.value = null

    const scopeSlug = `&timeFrame=${intervalBy || 'MAX'}`
    // https://dex-backend-mainnet.prd.service.aepps.com/graph?graphType=Price&timeFrame=MAX&tokenAddress=ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa
    const url = `https://dex-backend-mainnet.prd.service.aepps.com/graph?graphType=Price&tokenAddress=ct_J3zBY8xxjsRr3QojETNw48Eb38fjvEuJKkQ6KzECvubvEcvCa${scopeSlug}`

    const { data } = await axios.get(url)
    // remove last interval from the response not to show current interval that is being built
    priceStatistics.value = data
  }

  return {
    priceStatistics,
    keyblocksStatistics,
    transactionsStatistics,
    contractsStatistics,
    namesStatistics,
    difficultyStatistics,
    hashrateStatistics,
    accountsStatistics,
    fetchPriceStatistics,
    fetchKeyblocksStatistics,
    fetchTransactionsStatistics,
    fetchContractsStatistics,
    fetchNamesStatistics,
    fetchDifficultyStatistics,
    fetchHashrateStatistics,
    fetchAccountsStatistics,
  }
})
