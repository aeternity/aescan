import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useWebSocket = defineStore('webSocket', () => {
  const { WEBSOCKET_URL } = useRuntimeConfig().public
  const { processSocketMessage } = useRecentBlocksStore()

  const webSocket = shallowRef()
  const isSubscribedToKeyblockDetails = ref(false)

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

    webSocket.value.onmessage = event => {
      processWebSocketData(event.data)
    }
  }

  async function processWebSocketData(data) {
    if (!data.includes('payload')) {
      return
    }
    const parsedData = camelcaseKeysDeep(JSON.parse(data))
    await processSocketMessage(parsedData)
  }

  return {
    isSubscribedToKeyblockDetails,
    initializeWebSocket,
  }
})
