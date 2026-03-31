import { useRuntimeConfig } from 'nuxt/app'

export const useTransactionDetailsStore = defineStore('transactionDetails', () => {
  const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const contractId = ref(null)
  const rawTransactionDetails = ref(null)
  const transactionTypeData = ref(null)
  const adjacentTransactions = ref(null)

  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const transactionDetails = computed(
    () => rawTransactionDetails.value
      ? adaptTransactionDetails(rawTransactionDetails.value, blockHeight)
      : null,
  )

  async function fetchTransactionDetails(transactionId) {
    clearTransactionDetails()
    const { data: transaction } = await axios.get(`${NODE_URL}/transactions/${transactionId}`)
    const isMined = transaction.blockHeight > -1

    const time = isMined ? await fetchTimeByBlockHash(transaction.blockHash) : null

    rawTransactionDetails.value = {
      ...transaction,
      isMined,
      time,
    }

    return fetchTransactionTypeData(transactionId)
  }

  async function fetchTransactionTypeData(transactionId) {
    try {
      const { data: transactionData } = await axios.get(`${MIDDLEWARE_URL}/transactions/${transactionId}`)

      if (transactionData.tx.channelId) {
        const { data: channelData } = await axios.get(`${MIDDLEWARE_URL}/channels/${transactionData.tx.channelId}`)

        transactionData.tx.channel = channelData
      }

      transactionTypeData.value = transactionData.tx
    } catch {
      transactionTypeData.value = null
    }
  }

  async function fetchAdjacentTransactions() {
    const { blockHash, blockHeight: txBlockHeight, hash: currentTxHash } = rawTransactionDetails.value || {}

    if (!blockHash?.startsWith('mh_')) {
      adjacentTransactions.value = { prevHash: null, nextHash: null }
      return
    }

    try {
      // Node API returns all txs in MB as a plain array (0-based); find current tx by hash
      const [{ data: nodeData }, { data: mb }] = await Promise.all([
        axios.get(`${NODE_URL}/micro-blocks/hash/${blockHash}/transactions`),
        axios.get(`${MIDDLEWARE_URL}/micro-blocks/${blockHash}`),
      ])
      const mbTxs = nodeData.transactions
      const txIndex = mbTxs.findIndex(t => t.hash === currentTxHash)
      const { microBlockIndex, prevHash: mbPrevHash } = mb

      let prevHash = txIndex > 0 ? (mbTxs[txIndex - 1]?.hash ?? null) : null
      let nextHash = txIndex < mbTxs.length - 1 ? (mbTxs[txIndex + 1]?.hash ?? null) : null

      if (prevHash === null && txIndex === 0) {
        if (mbPrevHash?.startsWith('mh_')) {
          const { data: prevMbData } = await axios.get(`${NODE_URL}/micro-blocks/hash/${mbPrevHash}/transactions`)
          prevHash = prevMbData.transactions[prevMbData.transactions.length - 1]?.hash ?? null
        } else if (txBlockHeight > 0) {
          const { data: kbMbs } = await axios.get(`${MIDDLEWARE_URL}/key-blocks/${txBlockHeight - 1}/micro-blocks?limit=1&direction=backward`)
          const lastMb = kbMbs.data?.[0]
          if (lastMb) {
            const { data: prevMbData } = await axios.get(`${NODE_URL}/micro-blocks/hash/${lastMb.hash}/transactions`)
            prevHash = prevMbData.transactions[prevMbData.transactions.length - 1]?.hash ?? null
          }
        }
      }

      if (nextHash === null && txIndex === mbTxs.length - 1) {
        const { data: kbMbs } = await axios.get(`${MIDDLEWARE_URL}/key-blocks/${txBlockHeight}/micro-blocks?limit=100&direction=forward`)
        const nextMb = kbMbs.data?.find(m => m.microBlockIndex === microBlockIndex + 1)

        let nextMbHash = nextMb?.hash
        if (!nextMbHash) {
          const { data: nextKbMbs } = await axios.get(`${MIDDLEWARE_URL}/key-blocks/${txBlockHeight + 1}/micro-blocks?limit=1&direction=forward`)
          nextMbHash = nextKbMbs.data?.[0]?.hash ?? null
        }

        if (nextMbHash) {
          const { data: nextMbData } = await axios.get(`${NODE_URL}/micro-blocks/hash/${nextMbHash}/transactions`)
          nextHash = nextMbData.transactions[0]?.hash ?? null
        }
      }

      adjacentTransactions.value = { prevHash, nextHash }
    } catch {
      adjacentTransactions.value = { prevHash: null, nextHash: null }
    }
  }

  async function fetchTimeByBlockHash(blockHash) {
    const { data } = await axios.get(`${NODE_URL}/micro-blocks/hash/${blockHash}/header`)
    return data.time
  }

  async function fetchContractIdByAccountId(accountId) {
    const { data } = await axios.get(`${NODE_URL}/accounts/${accountId}`)
    contractId.value = data.contractId
  }

  function clearTransactionDetails() {
    rawTransactionDetails.value = null
    transactionTypeData.value = null
    adjacentTransactions.value = null
  }

  function updateTransactionTypeData(websocketMessage) {
    transactionTypeData.value = websocketMessage.tx
  }

  return {
    contractId,
    transactionDetails,
    transactionTypeData,
    adjacentTransactions,
    fetchTransactionDetails,
    fetchAdjacentTransactions,
    fetchContractIdByAccountId,
    updateTransactionTypeData,
  }
})
