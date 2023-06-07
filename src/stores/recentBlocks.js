import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import { adaptDeltaStats, adaptKeyblock, adaptSelectedMicroblockTransactions } from '@/utils/adapters'
import { formatAettosToAe, formatNullable, formatNumber } from '@/utils/format'
import {
  MESSAGE_BUFFER_SIZE_LIMIT,
  VISIBLE_KEYBLOCKS_LIMIT,
  VISIBLE_MICROBLOCKS_LIMIT,
  VISIBLE_TRANSACTIONS_LIMIT,
} from '@/utils/constants'

const isBlockFirstInSequence = (block, blockSequence) => block.hash === blockSequence?.[0].hash

export const useRecentBlocksStore = defineStore('recentBlocks', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { fetchTotalTransactionsCount, increaseTransactionsCounter } = useBlockchainStatsStore()

  const deltaStats = ref(null)
  const keyblocks = ref(null)
  const selectedKeyblockMicroblocks = ref(null)
  const rawSelectedMicroblockTransactions = ref(null)
  const rawSelectedKeyblock = ref(null)
  const rawSelectedMicroblock = ref(null)
  const messageBuffer = ref([])

  const selectedKeyblock = computed(() => {
    return adaptKeyblock(rawSelectedKeyblock.value || keyblocks.value?.[0])
  })
  const isFirstKeyblockSelected = computed(() => {
    return isBlockFirstInSequence(selectedKeyblock.value, keyblocks.value)
  })
  const isFirstMicroblockSelected = computed(() => {
    return !rawSelectedMicroblock.value ||
      isBlockFirstInSequence(rawSelectedMicroblock.value, selectedKeyblockMicroblocks.value)
  })
  const selectedMicroblock = computed(() => {
    return rawSelectedMicroblock.value || selectedKeyblockMicroblocks.value?.[0]
  })
  const selectedKeyblockTransactionsCount = computed(() => {
    return selectedKeyblock.value ? formatNullable(formatNumber(selectedKeyblock.value.transactions_count)) : ''
  })
  const selectedMicroblockTransactions = computed(() => {
    return rawSelectedMicroblockTransactions.value
      ? adaptSelectedMicroblockTransactions(rawSelectedMicroblockTransactions.value)
      : null
  })
  const selectedMicroblockTransactionsCount = computed(() => {
    return selectedMicroblock.value?.transactions_count || 0
  })
  const selectedDeltaStats = computed(() => {
    const selectedKeyblockHeight = selectedKeyblock.value?.height || blockHeight.value
    return deltaStats.value ? adaptDeltaStats(deltaStats.value, selectedKeyblockHeight) : null
  })
  const latestReward = computed(() => {
    return deltaStats.value ? formatAettosToAe(deltaStats.value[0].block_reward) : null
  })
  const latestBri = computed(() => {
    return deltaStats.value ? formatAettosToAe(deltaStats.value[0].dev_reward) : null
  })
  const latestKeyblockTransactionsCount = computed(() => {
    return keyblocks.value?.[0].transactions_count
  })
  const blockHeight = computed(() => {
    return keyblocks.value?.[0].height
  })

  /* USER INTERACTION */

  async function selectKeyblock(keyblock) {
    if (isBlockFirstInSequence(keyblock, keyblocks.value)) {
      rawSelectedKeyblock.value = null
    } else {
      rawSelectedKeyblock.value = keyblock
    }

    if (keyblock?.micro_blocks_count === 0) {
      clearSelectedMicroblocks()
      return
    }

    await fetchSelectedKeyblockMicroblocks(keyblock.hash)
    return selectMicroblock(selectedKeyblockMicroblocks.value[0])
  }

  function selectMicroblock(microblock) {
    if (isBlockFirstInSequence(microblock, selectedKeyblockMicroblocks.value)) {
      rawSelectedMicroblock.value = null
    } else {
      rawSelectedMicroblock.value = microblock
    }

    return fetchSelectedMicroblockTransactions()
  }

  /* HANDLING COMMUNICATION OVER REST API */

  async function fetchKeyblocks() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks?&limit=${VISIBLE_KEYBLOCKS_LIMIT}`)
    keyblocks.value = data.data
  }

  // correct transactions and microblock count in past keyblocks to account for microfork changes
  async function fetchPastKeyblocksStatistics() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks?&limit=${VISIBLE_KEYBLOCKS_LIMIT}`)
    for (let index = 1; index < data.data.length; index++) {
      const keyblockToUpdate = keyblocks.value.find(block => block.height === data.data[index].height)

      if (!keyblockToUpdate) {
        continue
      }

      keyblockToUpdate.transactions_count = data.data[index].transactions_count
      keyblockToUpdate.micro_blocks_count = data.data[index].micro_blocks_count
    }
  }

  async function fetchSelectedMicroblocksInfo() {
    await fetchSelectedKeyblockMicroblocks(keyblocks.value[0].hash)
    await fetchSelectedMicroblockTransactions()
  }

  async function fetchSelectedKeyblockMicroblocks(hash) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/key-blocks/${hash}/micro-blocks?limit=${VISIBLE_MICROBLOCKS_LIMIT}`)
    selectedKeyblockMicroblocks.value = data.data
  }

  async function fetchSelectedMicroblockTransactions(queryParameters = null) {
    if (!selectedMicroblock.value) {
      return
    }

    const defaultParameters = `/v2/micro-blocks/${selectedMicroblock.value.hash}/txs?limit=${VISIBLE_TRANSACTIONS_LIMIT}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawSelectedMicroblockTransactions.value = data
  }

  async function fetchDeltaStats() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/deltastats?limit=20`)
    deltaStats.value = data.data
  }

  /* HANDLING COMMUNICATION OVER WEBSOCKET */

  function processSocketMessage(message) {
    messageBuffer.value.push(message)

    if (messageBuffer.value.length > MESSAGE_BUFFER_SIZE_LIMIT) {
      return resetMessageBuffer()
    }

    for (let i = messageBuffer.value.length - 1; i >= 0; i--) {
      if (!consumeBufferMessage()) {
        break
      }
    }
  }

  function consumeBufferMessage() {
    for (let i = 0; i < messageBuffer.value.length; i++) {
      const message = messageBuffer.value[i]
      let success = false

      switch (message.subscription) {
      case 'KeyBlocks':
        success = processKeyblockUpdate(message.payload)
        break
      case 'MicroBlocks':
        success = processMicroblockUpdate(message.payload)
        break
      default:
        success = processTransactionUpdate(message.payload)
        break
      }

      if (success) {
        messageBuffer.value.splice(i, 1)
        return true
      }
    }

    return false
  }

  function processKeyblockUpdate(keyblock) {
    if (keyblocks.value?.[0].hash !== keyblock.prev_key_hash) {
      return false
    }

    prependKeyblock(keyblock)

    // fetch latest blockchain information to correct stale statistics caused by microforks
    Promise.all([
      fetchPastKeyblocksStatistics(),
      fetchDeltaStats(),
      fetchTotalTransactionsCount(),
    ])

    return true
  }

  function processMicroblockUpdate(microblock) {
    const parentKeyblock = keyblocks.value.find(keyblock => keyblock.height === microblock.height)

    if (!parentKeyblock) {
      return false
    }

    parentKeyblock.micro_blocks_count += 1

    if (microblock.prev_key_hash === selectedKeyblock.value.hash) {
      prependMicroblock(microblock)
    }

    return true
  }

  function processTransactionUpdate(transaction) {
    // keyblock-related statistics
    const parentKeyblock = keyblocks.value.find(keyblock => keyblock.height === transaction.block_height)

    if (!parentKeyblock) {
      return false
    }

    parentKeyblock.transactions_count += 1
    increaseTransactionsCounter()

    if (selectedKeyblock.value?.height !== transaction.block_height) {
      return true
    }

    // microblock-related statistics
    const parentMicroblock = selectedKeyblockMicroblocks.value.find(
      microblock => microblock.hash === transaction.block_hash,
    )

    if (!parentMicroblock) {
      return false
    }

    parentMicroblock.transactions_count += 1

    // currently displayed microblock transactions
    if (transaction.block_hash === selectedMicroblock.value?.hash) {
      appendTransactionToSelectedMicroblock(transaction)
    }

    return true
  }

  async function resetMessageBuffer() {
    messageBuffer.value = []

    await Promise.all([
      fetchKeyblocks().then(fetchSelectedMicroblocksInfo()),
      fetchDeltaStats(),
      fetchTotalTransactionsCount(),
    ])
  }

  /* DATA UPDATE UTILS */

  function prependKeyblock(keyblock) {
    keyblocks.value.unshift({
      transactions_count: 0,
      micro_blocks_count: 0,
      ...keyblock,
    })

    if (keyblocks.value.length > VISIBLE_KEYBLOCKS_LIMIT) {
      keyblocks.value.pop()
    }

    if (isFirstKeyblockSelected.value) {
      clearSelectedMicroblocks()
    }
  }

  function prependMicroblock(microblock) {
    selectedKeyblockMicroblocks.value.unshift({
      transactions_count: 0,
      ...microblock,
    })

    if (selectedKeyblockMicroblocks.value.length > VISIBLE_MICROBLOCKS_LIMIT) {
      const lastMicroblock = selectedKeyblockMicroblocks.value.pop()

      if (lastMicroblock.hash === rawSelectedMicroblock.value?.hash) {
        deselectMicroblock()
      }
    }

    if (isFirstMicroblockSelected.value) {
      clearCurrentlySelectedMicroblock()
    }
  }

  function clearSelectedMicroblocks() {
    deselectMicroblock()
    clearCurrentlySelectedMicroblock()
    selectedKeyblockMicroblocks.value = []
  }

  function deselectMicroblock() {
    rawSelectedMicroblock.value = null
  }

  function clearCurrentlySelectedMicroblock() {
    rawSelectedMicroblockTransactions.value = { data: [] }
  }

  function appendTransactionToSelectedMicroblock(transaction) {
    if (rawSelectedMicroblockTransactions.value.data.length < VISIBLE_TRANSACTIONS_LIMIT) {
      rawSelectedMicroblockTransactions.value.data.push({
        micro_time: Date.now(),
        ...transaction,
      })
    }
  }

  return {
    fetchDeltaStats,
    fetchKeyblocks,
    fetchSelectedMicroblocksInfo,
    fetchSelectedMicroblockTransactions,
    processSocketMessage,
    resetMessageBuffer,
    selectKeyblock,
    selectMicroblock,
    blockHeight,
    keyblocks,
    latestKeyblockTransactionsCount,
    latestReward,
    latestBri,
    selectedKeyblock,
    selectedDeltaStats,
    selectedKeyblockTransactionsCount,
    selectedKeyblockMicroblocks,
    selectedMicroblock,
    selectedMicroblockTransactionsCount,
    selectedMicroblockTransactions,
  }
})
