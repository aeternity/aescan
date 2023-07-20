import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptContractDetails, adaptContractEvents, adaptTransactions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useContractDetailsStore = defineStore('contractDetails', () => {
  const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const contractId = ref(null)
  const contractCallsCount = ref(null)
  const contractCreationTx = ref(null)
  const contractType = ref('')
  const rawContractInformation = ref(null)
  const rawContractEvents = ref(null)
  const rawContractCallTransactions = ref(null)
  const contractAccountBalance = ref(null)

  const contractEvents = computed(() => {
    return rawContractEvents.value
      ? adaptContractEvents(rawContractEvents.value, blockHeight.value)
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
    await Promise.allSettled([
      fetchContractInformation(),
      fetchContractCallsCount(),
      fetchContractCreationTx(),
      fetchContractType(),
      fetchBalance(),
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
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count/${contractId.value}`)
    contractCallsCount.value = Object.values(data?.contractCallTx ?? {}).reduce((sum, value) => sum + value, 0)
  }

  async function fetchContractCreationTx() {
    contractCreationTx.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs?limit=1&contract=${contractId.value}&direction=forward`)
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
    const defaultParameters = `/v2/contracts/logs?contractId=${contractId.value}`
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

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v2/txs`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', limit ?? 10)
    transactionsUrl.searchParams.append('type', 'contract_call')
    transactionsUrl.searchParams.append('contract', contractId.value)

    const { data } = await axios.get(transactionsUrl.toString())
    rawContractCallTransactions.value = data
  }

  async function fetchIsContractAex9() {
    await axios.get(`${MIDDLEWARE_URL}/v2/aex9/${contractId.value}`)
    contractType.value = 'AEX-9'
  }

  async function fetchIsContractAex141() {
    await axios.get(`${MIDDLEWARE_URL}/v2/aex141/${contractId.value}`)
    contractType.value = 'AEX-141'
  }

  return {
    contractId,
    contractCallsCount,
    contractCreationTx,
    contractType,
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
