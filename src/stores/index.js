import { storeToRefs } from 'pinia'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { useRuntimeConfig } from 'nuxt/app'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import { useMarketStatsStore } from '@/stores/marketStats'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { useStatus } from '@/stores/status'

export async function initializeStores() {
  const { fetchKeyblocks } = useRecentBlocksStore()
  const { fetchStatus } = useStatus()
  const { fetchMarketStats } = useMarketStatsStore()

  try {
    await Promise.all([
      fetchKeyblocks(),
      fetchStatus(),
      fetchMarketStats(),
    ])
  } catch (error) {
    console.error(error)
    return undefined
  }

  return true
}

export function initializeWebSocket() {
  const webSocket = new WebSocket(useRuntimeConfig().public.WEBSOCKET_URL)

  webSocket.onopen = () => {
    openWebSocket(webSocket)
  }
  webSocket.onclose = () => {
    setTimeout(() => {
      initializeWebSocket()
    }, 1000)
  }
}

function openWebSocket(socket) {
  socket.send('{"op":"Subscribe", "payload": "KeyBlocks"}')
  socket.send('{"op":"Subscribe", "payload": "MicroBlocks"}')
  socket.send('{"op":"Subscribe", "payload": "Transactions"}')
  socket.onmessage = event => {
    processWebSocketData(event.data)
  }
}

async function processWebSocketData(data) {
  if (data.includes('payload')) {
    const payload = camelcaseKeysDeep(JSON.parse(data).payload)
    if (payload.tx) { // transaction hook
      const { fetchTotalTransactionsCount } = useBlockchainStatsStore()
      const store = useRecentBlocksStore()
      const {
        fetchKeyblocks,
        fetchSelectedMicroblockTransactions,
        fetchSelectedKeyblockMicroblocks,
      } = store
      const {
        isFirstKeyblockSelected,
        isFirstMicroblockSelected,
        selectedKeyblock,
      } = storeToRefs(store)

      fetchTotalTransactionsCount()
      await fetchKeyblocks()
      await fetchSelectedKeyblockMicroblocks(selectedKeyblock.value.hash)
      if (isFirstMicroblockSelected.value && isFirstKeyblockSelected.value) {
        await fetchSelectedMicroblockTransactions()
      }
    } else if (payload.pofHash) { // microblock hook
    } else if (payload.beneficiary) { // keyblock hook
      const { fetchDeltaStats } = useRecentBlocksStore()
      fetchDeltaStats()
    }
  }
}
