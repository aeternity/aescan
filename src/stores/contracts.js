import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptContracts } from '@/utils/adapters'

export const useContractsStore = defineStore('contracts', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawContracts = ref(null)
  const contractsCount = ref(null)

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
  async function fetchContractsCount() {
    contractsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count?type=contract_create`)
    contractsCount.value = data
  }

  return {
    rawContracts,
    contractsCount,
    contracts,
    fetchContracts,
    fetchContractsCount,
  }
})
