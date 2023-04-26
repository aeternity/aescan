import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useWebSocket = defineStore('webSocket', () => {
  const { WEBSOCKET_URL } = useRuntimeConfig().public

  const webSocket = shallowRef()
  const isSubscribedToKeyblockDetails = ref(false)

  watch(isSubscribedToKeyblockDetails, newValue => {
    if (!webSocket.value || webSocket.value.readyState !== WebSocket.OPEN) {
      return
    }

    if (newValue) {
      webSocket.value.send('{"op":"Subscribe", "payload": "MicroBlocks"}')
      webSocket.value.send('{"op":"Subscribe", "payload": "Transactions"}')
    } else {
      webSocket.value.send('{"op":"Unsubscribe", "payload": "MicroBlocks"}')
      webSocket.value.send('{"op":"Unsubscribe", "payload": "Transactions"}')
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
    webSocket.value.send('{"op":"Subscribe", "payload": "KeyBlocks"}')

    if (isSubscribedToKeyblockDetails.value) {
      webSocket.value.send('{"op":"Subscribe", "payload": "MicroBlocks"}')
      webSocket.value.send('{"op":"Subscribe", "payload": "Transactions"}')
    }

    webSocket.value.onmessage = event => {
      processWebSocketData(event.data)
    }
  }

  async function processWebSocketData(data) {
    if (!data.includes('payload')) {
      return
    }

    const { processSocketMessage } = useRecentBlocksStore()

    await processSocketMessage(JSON.parse(data))
  }

  return {
    isSubscribedToKeyblockDetails,
    initializeWebSocket,
  }
})
