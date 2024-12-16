import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import useFeatureFlags from '@/composables/useFeatureFlags'
import { adaptContracts } from '@/utils/adapters'

export const useContractsStore = defineStore('contracts', () => {
  const { MIDDLEWARE_URL, CONTRACT_VERIFICATION_SERVICE_URL } = useRuntimeConfig().public
  const featureFlags = useFeatureFlags()

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

  async function fetchContractsCount() {
    contractsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/count?type=contract_create`)
    contractsCount.value = data
  }

  async function fetchVerifiedContracts(contracts) {
    if (featureFlags.isHyperchain) {
      return
    }

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
  }
})
