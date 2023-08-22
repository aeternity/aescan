import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { useTransactionDetailsStore } from '@/stores/transactionDetails'

export const useWebSocket = defineStore('webSocket', () => {
  const { WEBSOCKET_URL } = useRuntimeConfig().public
  const { processSocketMessage } = useRecentBlocksStore()
  const { processTransactionUpdate } = useTransactionDetailsStore()

  const webSocket = shallowRef()
  const isSubscribedToKeyblockDetails = ref(false)
  const subscribedTransactionId = ref(null)

  watch(isSubscribedToKeyblockDetails, newValue => {
    if (!webSocket.value || webSocket.value.readyState !== WebSocket.OPEN) {
      return
    }

    if (newValue) {
      webSocket.value.send('{"op":"Subscribe", "source": "node", "payload": "MicroBlocks"}')
    } else {
      webSocket.value.send('{"op":"Unsubscribe", "source": "node", "payload": "MicroBlocks"}')
    }
  })

  watch(subscribedTransactionId, (newTransactionId, oldTransactionId) => {
    if (!webSocket.value || webSocket.value.readyState !== WebSocket.OPEN) {
      return
    }

    if (newTransactionId) {
      webSocket.value.send(`{"op":"Subscribe", "source": "mdw", "payload": "${newTransactionId}"}`)
    } else {
      webSocket.value.send(`{"op":"Unsubscribe", "source": "mdw", "payload": "${oldTransactionId}"}`)
    }
  })

  function initializeWebSocket() {
    webSocket.value = new WebSocket(WEBSOCKET_URL)

    webSocket.value.onopen = () => {
      openWebSocket()
    }
    webSocket.value.onclose = () => {
      setTimeout(() => {
        initializeWebSocket()
      }, 1000)
    }
  }

  function openWebSocket() {
    webSocket.value.send('{"op":"Subscribe", "source": "node", "payload": "KeyBlocks"}')

    if (isSubscribedToKeyblockDetails.value) {
      webSocket.value.send('{"op":"Subscribe", "source": "node", "payload": "MicroBlocks"}')
    }

    if (subscribedTransactionId.value) {
      webSocket.value.send(`{"op":"Subscribe", "source": "node", "payload": "${subscribedTransactionId.value}"}`)
    }

    webSocket.value.onmessage = event => {
      processWebSocketData(event.data)
    }
  }

  async function processWebSocketData(data) {
    if (!data.includes('payload')) {
      return
    }
    const parsedData = camelcaseKeysDeep(JSON.parse(data))
    if (parsedData.subscription === 'Object' && parsedData.payload?.hash === subscribedTransactionId.value) {
      processTransactionUpdate(parsedData.payload)
    } else {
      await processSocketMessage(parsedData)
    }
  }

  return {
    isSubscribedToKeyblockDetails,
    subscribedTransactionId,
    initializeWebSocket,
  }
})
