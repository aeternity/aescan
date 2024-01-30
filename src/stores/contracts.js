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
    // todo improve

    await Promise.all(rawContracts.value.data.map(async contract => {
      contract.isVerified = await fetchIsContractVerified(contract.tx.contractId)
    }))
  }

  async function fetchContractsStatistics(slug) {
    contractsStatistics.value = null

    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/statistics/transactions?tx_type=contract_call${slug || '&limit=8&interval_by=day'}`)

    contractsStatistics.value = data.data.slice(1).reverse()
  }

  async function fetchContractsCount() {
    contractsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count?type=contract_create`)
    contractsCount.value = data
  }

  async function fetchIsContractVerified(contractId) {
    try {
      const { data } = await axios.get(`http://localhost:3000/contracts/${contractId}`)
      return !!data
    } catch (error) {
      return false
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
