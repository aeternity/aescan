import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptContracts } from '@/utils/adapters'

export const useContractsStore = defineStore('contracts', () => {
  const { MIDDLEWARE_URL, CONTRACT_VERIFICATION_SERVICE_URL } = useRuntimeConfig().public

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
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v3/transactions?type=contract_create&limit=10'}`)

    const verifiedContracts = await fetchVerifiedContracts(data)
    if (verifiedContracts) {
      data.data.forEach(contract => {
        contract.isVerified = !!verifiedContracts.find(verifiedContract => verifiedContract === contract.tx.contractId)
      })
    }
    rawContracts.value = data
  }

  async function fetchContractsStatistics(interval = 'day', limit = 7, range) {
    contractsStatistics.value = null

    const slug = range
      ? `&min_start_date=${range.minStart}&max_start_date=${range.maxStart}&limit=1000`
      : `&interval_by=${interval}&limit=${limit}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions?tx_type=contract_call${slug}`)

    // remove last interval from the response not to show current interval that is being built
    contractsStatistics.value = range ? data.data.reverse() : data.data.slice(1).reverse()
  }

  async function fetchContractsCount() {
    contractsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/count?type=contract_create`)
    contractsCount.value = data
  }

  async function fetchVerifiedContracts(contracts) {
    const slug = contracts.data.map(contract => contract.tx.contractId).join('&ids=')
    try {
      const { data } = await axios.get(`${CONTRACT_VERIFICATION_SERVICE_URL}/contracts?ids=${slug}`)
      return data.contracts.map(contract => contract.contractId)
    } catch (error) {
      return null
    }
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
