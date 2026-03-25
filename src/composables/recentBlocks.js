import { useRuntimeConfig } from 'nuxt/app'
import { VISIBLE_KEYBLOCKS_LIMIT, VISIBLE_TRANSACTIONS_LIMIT } from '@/utils/constants'

export const useRecentBlocksStore = defineStore('recentBlocks', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const MIDDLEWARE_BASE_URL = MIDDLEWARE_URL.replace(/\/v\d+$/, '')
  const axios = useAxios()
  const { fetchTotalTransactionsCount } = useBlockchainStatsStore()

  const deltaStats = ref(null)
  const keyblocks = ref(null)
  const keyblocksNextPage = ref(null)
  const isLoadingMoreKeyblocks = ref(false)
  const selectedKeyblockMicroblocks = ref(null)
  const rawSelectedMicroblockTransactions = ref(null)
  const rawSelectedKeyblock = ref(null)
  const rawSelectedMicroblock = ref(null)
  const blockHeight = ref(null)

  const isBlockFirstInSequence = (block, blockSequence) => block.hash === blockSequence?.[0].hash

  const selectedKeyblock = computed(() => {
    return adaptKeyblock(rawSelectedKeyblock.value || keyblocks.value?.[0])
  })
  const isFirstKeyblockSelected = computed(() => {
    return isBlockFirstInSequence(selectedKeyblock.value, keyblocks.value)
  })
  const isFirstMicroblockSelected = computed(() => {
    return !rawSelectedMicroblock.value
      || isBlockFirstInSequence(rawSelectedMicroblock.value, selectedKeyblockMicroblocks.value)
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
  const latestKeyblockTransactionsCount = computed(() => {
    return keyblocks.value?.[0].transactionsCount
  })

  /* USER INTERACTION */

  async function selectKeyblock(keyblock) {
    if (isBlockFirstInSequence(keyblock, keyblocks.value)) {
      rawSelectedKeyblock.value = null
    } else {
      rawSelectedKeyblock.value = keyblock
    }

    // When clicking near the end of the loaded list, fetch more keyblocks in background
    const idx = keyblocks.value.findIndex(k => k.hash === keyblock.hash)
    if (idx >= keyblocks.value.length - 6) {
      fetchMoreKeyblocks()
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
    const { data } = await axios.get(`${MIDDLEWARE_URL}/key-blocks?limit=${VISIBLE_KEYBLOCKS_LIMIT}`)
    const freshBlocks = data.data
    blockHeight.value = freshBlocks[0].height

    if (keyblocks.value && keyblocks.value.length > freshBlocks.length) {
      // Preserve extended tail when user has loaded more blocks
      const lastFreshHash = freshBlocks[freshBlocks.length - 1].hash
      const tailIndex = keyblocks.value.findIndex(k => k.hash === lastFreshHash)
      if (tailIndex !== -1) {
        keyblocks.value = [...freshBlocks, ...keyblocks.value.slice(tailIndex + 1)]
        return
      }
    }
    keyblocks.value = freshBlocks
    keyblocksNextPage.value = data.next || null
  }

  async function fetchMoreKeyblocks() {
    if (!keyblocksNextPage.value || isLoadingMoreKeyblocks.value) return
    isLoadingMoreKeyblocks.value = true
    try {
      const { data } = await axios.get(`${MIDDLEWARE_BASE_URL}${keyblocksNextPage.value}`)
      keyblocks.value = [...keyblocks.value, ...data.data]
      keyblocksNextPage.value = data.next || null
    } finally {
      isLoadingMoreKeyblocks.value = false
    }
  }

  function updateBlockHeight(websocketMessage) {
    blockHeight.value = websocketMessage.height
  }

  // correct transactions and microblock count in past keyblocks to account for microfork changes
  async function fetchSelectedMicroblocksInfo() {
    await fetchSelectedKeyblockMicroblocks(keyblocks.value[0].hash)
    await fetchSelectedMicroblockTransactions()
  }

  async function fetchSelectedKeyblockMicroblocks(hash) {
    const allMicroblocks = []
    let nextUrl = `${MIDDLEWARE_URL}/key-blocks/${hash}/micro-blocks?limit=100`
    while (nextUrl) {
      const { data } = await axios.get(nextUrl)
      allMicroblocks.push(...data.data)
      nextUrl = data.next ? `${MIDDLEWARE_BASE_URL}${data.next}` : null
    }
    selectedKeyblockMicroblocks.value = allMicroblocks
  }

  async function fetchSelectedMicroblockTransactions() {
    if (!selectedMicroblock.value) {
      return
    }

    try {
      const { data } = await axios.get(`${MIDDLEWARE_URL}/micro-blocks/${selectedMicroblock.value.hash}/transactions?limit=${VISIBLE_TRANSACTIONS_LIMIT}`)
      rawSelectedMicroblockTransactions.value = data
    } catch (error) {
      if (error?.response?.status === 404) {
        rawSelectedMicroblockTransactions.value = { data: [], next: null, prev: null }
      } else {
        throw error
      }
    }
  }

  async function fetchDeltaStats() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/stats/delta?limit=20`)
    deltaStats.value = data.data
  }

  /* HANDLING COMMUNICATION OVER WEBSOCKET */

  async function processSocketMessage(message) {
    switch (message.subscription) {
      case 'KeyBlocks':
        updateBlockHeight(message.payload)
        fetchDeltaStats()
        await fetchKeyblocks()
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
    isFirstKeyblockSelected,
    isLoadingMoreKeyblocks,
    keyblocks,
    keyblocksNextPage,
    latestKeyblockTransactionsCount,
    latestReward,
    selectedKeyblock,
    selectedDeltaStats,
    selectedKeyblockTransactionsCount,
    selectedKeyblockMicroblocks,
    selectedMicroblock,
    selectedMicroblockTransactionsCount,
    selectedMicroblockTransactions,
    updateBlockHeight,
  }
})
