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

  if (process.client) {
    const { fetchMarketStats } = useMarketStatsStore()

    await Promise.all([
      fetchKeyblocks(),
      fetchStatus(),
      // execute client-side only due to api rate limit
      fetchMarketStats(),
    ])

    // no use for live updates on server-side
    initWebSocket()
  } else {
    await Promise.all([
      fetchKeyblocks(),
      fetchStatus(),
    ])
  }
}

function initWebSocket() {
  const webSocket = new WebSocket(useRuntimeConfig().public.WEBSOCKET_URL)

  webSocket.onopen = () => {
    openWebSocket(webSocket)
  }
  webSocket.onclose = () => {
    setTimeout(() => {
      initWebSocket()
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
