import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawTrades = ref(null)
  const tradeTxs = ref(null)
  const decimals = ref(null)

  const trades = computed(() =>
    rawTrades.value
      ? adaptTrades(rawTrades.value, tradeTxs.value, decimals.value)
      : null,
  )

  async function fetchTrades({ queryParameters, limit } = {}) {
    rawTrades.value = null
    const defaultParameters = `/v3/dex/swaps?limit=${limit ?? 10}`

    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)

    rawTrades.value = data

    await fetchTradeTx()
    await fetchTradeContracts()

    console.log('tradeTxs.value', tradeTxs.value)
    console.log('decimals.value', decimals.value)
  }

  async function fetchTradeTx() {
    tradeTxs.value = {}
    await Promise.all(
      rawTrades.value.data.map(async trade => {
        const data = await fetchExecuted(trade.txHash)
        tradeTxs.value[trade.txHash] = {
          blockHeight: data.blockHeight,
          timestamp: data.microTime,
          contracts: data.tx.arguments[1],
        }
      }),
    )
  }

  async function fetchTradeContracts() {
    decimals.value = {}

    const aaa = []

    const contracts = Object.entries(tradeTxs.value).map(async tx => {
      console.log('contracts', tx[1].contracts.value)
      tx[1].contracts.value.forEach(contract => {
        aaa.push(contract.value)
      })
    })

    console.log('contracts', contracts)
    console.log('aaa', aaa)

    const uniqueItems = [...new Set(aaa)]

    console.log('uniqueItems', uniqueItems)

    await Promise.all(
      uniqueItems.map(async contractId => {
        const data = await fetchToken(contractId)
        decimals.value[contractId] = data.decimals
      }),
    )

    // await Promise.all(
    //   Object.entries(tradeTxs.value).map(async time => {
    //     console.log('time', time)
    //     const nevim = time[1].contracts.value.map(async id => {
    //       console.log('id', id.value)
    //       const data = await fetchToken(id.value)
    //       console.log('data', data)
    //       return {
    //         [id.value]: data.decimals,
    //       }
    //     })
    //     console.log('nevim', nevim)
    //   }),
    // )
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
