import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptContracts } from '@/utils/adapters'

export const useContractsStore = defineStore('contracts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawContracts = ref(null)
  const contractsCount = ref(null)
  const contractsStatistics = ref(null)

  const contracts = computed(() =>
    rawContracts.value
      ? adaptContracts(rawContracts.value)
      : null,
  )

  async function fetchContracts(queryParameters = null) {
    rawContracts.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v2/txs?type=contract_create&limit=10'}`)
    rawContracts.value = data
  }

  async function fetchContractsStatistics(interval = 'day', limit = 7, range) {
    contractsStatistics.value = null

    const slug = range
      ? `&min_start_date=${range.minStart}&max_start_date=${range.maxStart}&limit=1000`
      : `&interval_by=${interval}&limit=${limit}`

    // todo mainnet url
    const { data } = await axios.get(`https://staging.mdw.mainnet.aeternity.io/mdw/v3/statistics/transactions?tx_type=contract_call${slug}`)

    // remove last interval from the response not to show current interval that is being built
    contractsStatistics.value = range ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchContractsCount() {
    contractsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count?type=contract_create`)
    contractsCount.value = data
  }

  return {
    rawContracts,
    contractsCount,
    contracts,
    contractsStatistics,
    fetchContracts,
    fetchContractsCount,
    fetchContractsStatistics,
  }
})
