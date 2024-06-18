import { defineStore, storeToRefs } from 'pinia'
import useAxios from '@/composables/useAxios'
import { useMarketStatsStore } from '~/stores/marketStats'
import { formatAeContractArgumentIndex } from '~/utils/format'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const axios = useAxios()
  const rawTrades = ref(null)
  const tradeTxs = ref(null)
  const decimals = ref(null)
  const { price } = storeToRefs(useMarketStatsStore())
  const { fetchMarketStats } = useMarketStatsStore()

  const trades = computed(() =>
    rawTrades.value
      ? adaptTrades(rawTrades.value, tradeTxs.value, decimals.value, price.value)
      : null,
  )

  async function fetchTrades({ queryParameters, limit } = {}) {
    await fetchMarketStats()
    rawTrades.value = null
    const defaultParameters = `/v3/dex/swaps?limit=${limit ?? 10}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)

    rawTrades.value = data

    await fetchTradeTx()
    await fetchTradeContracts()
    // console.log('price', price.value)
    // console.log('tradeTxs.value', tradeTxs.value)
    // console.log('decimals.value', decimals.value)
  }

  async function fetchTradeTx() {
    tradeTxs.value = {}
    await Promise.all(
      rawTrades.value.data.map(async trade => {
        const data = await fetchExecuted(trade.txHash)
        // console.log('arguments', data.tx.arguments)
        tradeTxs.value[trade.txHash] = {
          blockHeight: data.blockHeight,
          timestamp: data.microTime,
          contractArguments: data.tx.arguments,
        }
      }),
    )
  }

  async function fetchTradeContracts() {
    decimals.value = {}
    const contracts = []
    // todo refactor using map
    Object.entries(tradeTxs.value).map(([contractId, contract]) => {
      // todo destruct index
      const amounts = rawTrades.value.data.find(trade => trade.txHash === contractId).amounts
      const action = formatDexActionName(amounts)
      const contractArgumentIndex = formatAeContractArgumentIndex(action)
      contract.contractArguments[contractArgumentIndex].value.forEach(contract => {
        contracts.push(contract.value)
      })
    })

    const uniqueContracts = [...new Set(contracts)]

    await Promise.all(
      uniqueContracts.map(async contractId => {
        const data = await fetchToken(contractId)
        decimals.value[contractId] = data.decimals
      }),
    )
    // console.log('222decimals.value', decimals.value)
  }

  async function fetchExecuted(txHash) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/${txHash}`)
    return data
  }

  async function fetchToken(contractId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex9/${contractId}`)
    return data
  }

  return {
    fetchTrades,
    trades,
  }
})
