import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { adaptTransactionDetails } from '@/utils/adapters'

export const useTransactionDetailsStore = defineStore('transactionDetails', () => {
  const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const contractId = ref(null)
  const rawTransactionDetails = ref(null)
  const transactionTypeData = ref(null)

  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const transactionDetails = computed(
    () => rawTransactionDetails.value
      ? adaptTransactionDetails(rawTransactionDetails.value, blockHeight)
      : null,
  )

  async function fetchTransactionDetails(transactionId) {
    clearTransactionDetails()
    const { data: transaction } = await axios.get(`${NODE_URL}/v3/transactions/${transactionId}`)
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
      const { data: transactionData } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/${transactionId}`)

      if (transactionData.tx.channelId) {
        const { data: channelData } = await axios.get(`${MIDDLEWARE_URL}/v3/channels/${transactionData.tx.channelId}`)

        transactionData.tx.channel = channelData
      }

      transactionTypeData.value = transactionData.tx
    } catch {
      transactionTypeData.value = null
    }
  }

  async function fetchTimeByBlockHash(blockHash) {
    const { data } = await axios.get(`${NODE_URL}/v3/micro-blocks/hash/${blockHash}/header`)
    return data.time
  }

  async function fetchContractIdByAccountId(accountId) {
    // todo tohle se mi moc nelibi
    const { data } = await axios.get(`${NODE_URL}/v3/accounts/${accountId}`)

    contractId.value = data.contractId
  }

  function clearTransactionDetails() {
    rawTransactionDetails.value = null
    transactionTypeData.value = null
  }

  function updateTransactionTypeData(websocketMessage) {
    transactionTypeData.value = websocketMessage.tx
  }

  return {
    contractId,
    transactionDetails,
    transactionTypeData,
    fetchTransactionDetails,
    fetchContractIdByAccountId,
    updateTransactionTypeData,
  }
})
