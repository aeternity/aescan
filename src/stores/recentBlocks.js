import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import { adaptDeltaStats, adaptKeyblock, adaptSelectedMicroblockTransactions } from '@/utils/adapters'
import { formatAettosToAe, formatNullable, formatNumber } from '@/utils/format'
import { VISIBLE_KEYBLOCKS_LIMIT, VISIBLE_MICROBLOCKS_LIMIT, VISIBLE_TRANSACTIONS_LIMIT } from '@/utils/constants'

const isBlockFirstInSequence = (block, blockSequence) => block.hash === blockSequence?.[0].hash

export const useRecentBlocksStore = defineStore('recentBlocks', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { fetchTotalTransactionsCount } = useBlockchainStatsStore()

  const deltaStats = ref(null)
  const keyblocks = ref(null)
  const selectedKeyblockMicroblocks = ref(null)
  const rawSelectedMicroblockTransactions = ref(null)
  const rawSelectedKeyblock = ref(null)
  const rawSelectedMicroblock = ref(null)

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
    return selectedKeyblock.value ? formatNullable(formatNumber(selectedKeyblock.value.transactionsCount)) : ''
  })
  const selectedMicroblockTransactions = computed(() => {
    return rawSelectedMicroblockTransactions.value
      ? adaptSelectedMicroblockTransactions(rawSelectedMicroblockTransactions.value)
      : null
  })
  const selectedMicroblockTransactionsCount = computed(() => {
    return selectedMicroblock.value?.transactionsCount || 0
  })
  const selectedDeltaStats = computed(() => {
    const selectedKeyblockHeight = selectedKeyblock.value?.height || blockHeight.value
    return deltaStats.value ? adaptDeltaStats(deltaStats.value, selectedKeyblockHeight) : null
  })
  const latestReward = computed(() => {
    return deltaStats.value ? formatAettosToAe(deltaStats.value[0].blockReward) : null
  })
  const latestBri = computed(() => {
    return deltaStats.value ? formatAettosToAe(deltaStats.value[0].devReward) : null
  })
  const latestKeyblockTransactionsCount = computed(() => {
    return keyblocks.value?.[0].transactionsCount
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

    if (keyblock?.microBlocksCount === 0) {
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

  async function processSocketMessage(message) {
    switch (message.subscription) {
    case 'KeyBlocks':
      fetchDeltaStats()
      break
    case 'MicroBlocks':
      fetchTotalTransactionsCount()
      await fetchKeyblocks()

      try {
        await fetchSelectedKeyblockMicroblocks(selectedKeyblock.value.hash)

        if (isFirstMicroblockSelected.value && isFirstKeyblockSelected.value) {
          await fetchSelectedMicroblockTransactions()
        }
      } catch (error) {
        // ignore 400 errors when fetching data by a non-existing microblock
        // as they are caused by microforks
        if (error?.response.status !== 400) {
          throw error
        }
      }

      // sometimes delta stats are not yet available on keyblock message, so retry fetching them again
      if (selectedDeltaStats.value === null) {
        await fetchDeltaStats()
      }

      break
    }
  }

  /* DATA UPDATE UTILS */

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

  return {
    fetchDeltaStats,
    fetchKeyblocks,
    fetchSelectedMicroblocksInfo,
    fetchSelectedMicroblockTransactions,
    processSocketMessage,
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
