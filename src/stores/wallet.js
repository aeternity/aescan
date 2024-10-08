import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { AeSdkAepp, BrowserWindowMessageConnection, Node, walletDetector } from '@aeternity/aepp-sdk'

export const useWalletStore = defineStore('wallet', () => {
  const { NODE_URL, NETWORK_ID } = useRuntimeConfig().public

  const aeSdk = shallowRef(null)
  const detectedWallets = ref(null)
  const status = ref(null)
  const backLink = ref(null)

  async function initWallet() {
    try {
      const aeSdkOptions = {
        nodes: [{
          name: NETWORK_ID,
          instance: new Node(NODE_URL),
        }],
        compilerUrl: 'https://compiler.aepps.com',
      }

      aeSdk.value = new AeSdkAepp({
        name: 'æScan',
        ...aeSdkOptions,
        onNetworkChange({ networkId }) {
          aeSdk.value.selectNode(networkId)
          scanWallets()
        },
        onDisconnect() {
          status.value = 'disconnecting'
        },
      })
      await connect()
    } catch (error) {
      status.value = 'failed'
      throw error
    }
  }

  async function scanWallets() {
    status.value = 'detecting'

    detectedWallets.value = await new Promise(resolve => {
      const timeout = setTimeout(() => {
        resolve(undefined)
        status.value = 'not detected'
      }, 10000)

      function setDetected({ newWallet }) {
        stopScan()
        resolve(newWallet)
        clearTimeout(timeout)
        if (newWallet.info.networkId === NETWORK_ID) {
          status.value = 'detected'
        } else {
          status.value = 'not connected'
        }
      }

      const stopScan = walletDetector(new BrowserWindowMessageConnection(), setDetected)
    })
  }

  async function connect() {
    status.value = 'connecting'
    try {
      await aeSdk.value.connectToWallet(detectedWallets.value.getConnection())
      await aeSdk.value.subscribeAddress('subscribe', 'current')
      status.value = 'connected'
    } catch (error) {
      disconnect()
      status.value = 'denied'
    }
  }

  function disconnect() {
    aeSdk.value.disconnectWallet()
  }

  function setBackLink(link) {
    backLink.value = link
  }

  return {
    detectedWallets,
    status,
    scanWallets,
    initWallet,
    disconnect,
    aeSdk,
    backLink,
    setBackLink,
  }
})
