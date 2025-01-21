import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'

export const useContractDetailsStore = defineStore('contractDetails', () => {
  const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const contractId = ref(null)
  const contractCallsCount = ref(null)
  const contractCreationTx = ref(null)
  const contractType = ref('')
  const tokenDetails = ref(null)
  const rawContractInformation = ref(null)
  const rawContractEvents = ref(null)
  const rawContractCallTransactions = ref(null)
  const contractAccountBalance = ref(null)

  const contractEvents = computed(() => {
    return rawContractEvents.value
      ? adaptContractEvents(rawContractEvents.value)
      : null
  })

  const contractDetails = computed(() => {
    if (contractCallsCount.value === null || !contractCreationTx.value || !rawContractInformation.value) {
      return null
    }

    return adaptContractDetails(
      rawContractInformation.value,
      contractCallsCount.value,
      contractCreationTx.value,
      contractType.value,
      tokenDetails.value,
      contractAccountBalance.value,
    )
  })
  const contractCallTransactions = computed(() => {
    return rawContractCallTransactions.value
      ? adaptTransactions(rawContractCallTransactions.value)
      : null
  })

  async function fetchContractDetails(id) {
    contractId.value = id
    await Promise.all([
      fetchContractInformation(),
      Promise.allSettled([
        fetchContractInformation(),
        fetchContractCallsCount(),
        fetchContractCreationTx(),
        fetchContractType(),
        fetchBalance(),
      ]),
    ])

    return true
  }

  async function fetchContractInformation() {
    rawContractInformation.value = null
    const { data } = await axios.get(`${NODE_URL}/v3/contracts/${contractId.value}`)
    rawContractInformation.value = data
  }

  async function fetchContractCallsCount() {
    contractCallsCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/count?id=${contractId.value}`)
    contractCallsCount.value = data
  }

  async function fetchContractCreationTx() {
    contractCreationTx.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions?limit=1&contract=${contractId.value}&direction=forward`)
    contractCreationTx.value = data?.data[0]
  }

  function fetchContractType() {
    contractType.value = null
    return Promise.any([
      fetchIsContractAex9(),
      fetchIsContractAex141(),
    ])
  }

  async function fetchBalance() {
    const { data } = await axios.get(`${NODE_URL}/v3/accounts/${contractId.value.replace('ct_', 'ak_')}`)
    contractAccountBalance.value = data.balance
  }

  async function fetchContractEvents({ queryParameters = null }) {
    rawContractEvents.value = null
    const defaultParameters = `/v3/contracts/logs?contract_id=${contractId.value}&aexn-args=true`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawContractEvents.value = data
  }

  async function fetchContractCallTransactions({ limit, queryParameters } = {}) {
    rawContractCallTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      rawContractCallTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v3/transactions`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', limit ?? 10)
    transactionsUrl.searchParams.append('type', 'contract_call')
    transactionsUrl.searchParams.append('contract', contractId.value)

    const { data } = await axios.get(transactionsUrl.toString())
    rawContractCallTransactions.value = data
  }

  async function fetchIsContractAex9() {
    tokenDetails.value = (await axios.get(`${MIDDLEWARE_URL}/v3/aex9/${contractId.value}`)).data
    contractType.value = 'AEX-9'
  }

  async function fetchIsContractAex141() {
    tokenDetails.value = (await axios.get(`${MIDDLEWARE_URL}/v3/aex141/${contractId.value}`)).data
    contractType.value = 'AEX-141'
  }

  return {
    contractId,
    contractCallsCount,
    contractCreationTx,
    contractType,
    tokenDetails,
    rawContractInformation,
    rawContractEvents,
    rawContractCallTransactions,
    contractAccountBalance,
    contractDetails,
    contractEvents,
    contractCallTransactions,
    fetchContractDetails,
    fetchContractEvents,
    fetchContractCallTransactions,
  }
})
