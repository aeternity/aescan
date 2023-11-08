import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import { useTransactionDetailsStore } from '@/stores/transactionDetails'

export const useWebSocket = defineStore('webSocket', () => {
  const { WEBSOCKET_URL } = useRuntimeConfig().public
  const { processSocketMessage, updateBlockHeight } = useRecentBlocksStore()
  const { updateTransactionTypeData } = useTransactionDetailsStore()

  const webSocket = shallowRef()
  const isSubscribedToTransactionDetails = ref(false)
  const isSubscribedToKeyblockDetails = ref(false)
  const subscribedTransactionId = ref(null)

  watch(isSubscribedToTransactionDetails, newValue => {
    if (!webSocket.value || webSocket.value.readyState !== WebSocket.OPEN) {
      return
    }
    console.log('newValue', newValue)
    if (newValue) {
      webSocket.value.send('{"op":"Subscribe", "source": "node", "payload": "KeyBlocks"}')
    } else {
      webSocket.value.send('{"op":"Unsubscribe", "source": "node", "payload": "KeyBlocks"}')
    }
  })

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
    const isSpecificEntityMessage = parsedData.subscription === 'Object'
    const isSubscribedTransactionMessage = parsedData.payload?.hash === subscribedTransactionId.value
    const isSubscribedKeyblockMessage = parsedData.subscription === 'KeyBlocks'

    if (isSubscribedKeyblockMessage) {
      updateBlockHeight(parsedData.payload)
    } else if (isSpecificEntityMessage && isSubscribedTransactionMessage) {
      updateTransactionTypeData(parsedData.payload)
    } else {
      await processSocketMessage(parsedData)
    }
  }

  return {
    isSubscribedToTransactionDetails,
    isSubscribedToKeyblockDetails,
    subscribedTransactionId,
    initializeWebSocket,
  }
})
