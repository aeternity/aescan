import { defineStore, storeToRefs } from 'pinia'
import useAxios from '@/composables/useAxios'
import { useMarketStatsStore } from '~/stores/marketStats'
import { formatAeContractArgumentIndex } from '~/utils/format'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public

  const axios = useAxios()
  const rawTrades = ref(null)
  const tradeTxs = ref({})
  const decimals = ref({})
  const { price } = storeToRefs(useMarketStatsStore())
  const { fetchMarketStats } = useMarketStatsStore()

  async function fetchDexTrades({ queryParameters, limit } = {}) {
    // todo can go in promise
    rawTrades.value = null
    decimals.value = {}
    tradeTxs.value = {}

    await fetchTrades({ queryParameters, limit }).then(() => {
      return fetchMarketStats()
    }).then(() => {
      return fetchTradeTx()
    }).then(() => {
      return fetchTradeContracts()
    })
  }

  const trades = computed(() =>
    rawTrades.value && tradeTxs.value && decimals.value && price.value
      ? adaptTrades(rawTrades.value, tradeTxs.value, decimals.value, price.value)
      : null,
  )

  async function fetchTrades({ queryParameters, limit } = {}) {
    const defaultParameters = `/v3/dex/swaps?limit=${limit ?? 10}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)

    rawTrades.value = data
    // console.log('price', price.value)
    // console.log('tradeTxs.value', tradeTxs.value)
    // console.log('decimals.value', decimals.value)
  }

  async function fetchTradeTx() {
    await Promise.all(
      rawTrades.value.data.map(async trade => {
        const data = await fetchExecuted(trade.txHash)
        // console.log('arguments', data.tx.arguments)
        tradeTxs.value[trade.txHash] = {
          blockHeight: data.blockHeight,
          timestamp: data.microTime,
          contractArguments: data.tx.arguments,
          // todo clear the value here
        }
      }),
    )
  }

  async function fetchTradeContracts() {
    const contracts = []
    // todo refactor using map
    Object.entries(tradeTxs.value).forEach(([contractId, contract]) => {
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
      }))
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
    fetchDexTrades,
    trades,
  }
})
