import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { AE_AMOUNT_FORMATS, AeSdkAepp, BrowserWindowMessageConnection, Node, walletDetector } from '@aeternity/aepp-sdk'

export const useWalletStore = defineStore('wallet', () => {
  const { NODE_URL, NETWORK_ID } = useRuntimeConfig().public

  const walletInfo = ref(null)
  const aeSdk = ref(null)
  const balance = ref(null)
  const foundWallets = ref(null)
  const status = ref(null)

  async function initWallet() {
    console.log('init')
    // todo reuse instance

    try {
      const aeSdkOptions = {
        nodes: [{
          name: NETWORK_ID,
          instance: new Node(NODE_URL),
        }],
        compilerUrl: 'https://compiler.aepps.com',
      }

      aeSdk.value = shallowReactive(new AeSdkAepp({
        name: 'æScan',
        ...aeSdkOptions,
        async onNetworkChange({ networkId }) {
          await selectNode(networkId)
        },
        async onAddressChange() {
          await fetchAccountBalance()
        },
        onDisconnect() {
          status.value = 'disconnecting'
          resetState()
        },
      }))
      await connect()
    } catch (error) {
      status.value = 'failed'
      throw error
    }
  }

  async function scanWallets() {
    status.value = 'scanning'

    foundWallets.value = await new Promise(resolve => {
      const timeout = setTimeout(() => {
        resolve(undefined)
        status.value = 'not installed'
      }, 10000)

      const handleDetect = ({ newWallet }) => {
        status.value = 'found'
        clearTimeout(timeout)
        stopScan()
        resolve(newWallet)
      }
      const browserWindow = new BrowserWindowMessageConnection()

      const stopScan = walletDetector(browserWindow, handleDetect)
    })
  }

  async function connect() {
    walletInfo.value = await aeSdk.value.connectToWallet(foundWallets.value.getConnection())
    try {
      await aeSdk.value.subscribeAddress('subscribe', 'current')
      status.value = 'connected'
    } catch (error) {
      console.log('error', error)
      if (e.message !== 'Operation rejected by user') {
        status.value = 'denied'
      }
    }

    await fetchAccountBalance()
  }

  async function fetchAccountBalance() {
    balance.value = await aeSdk.value.getBalance(aeSdk.value.address, {
      format: AE_AMOUNT_FORMATS.AE,
    })
  }

  async function selectNode(selectedNetworkId) {
    // todo improve
    aeSdk.value.selectNode(selectedNetworkId)
    if (aeSdk.value.addresses().length) {
      await fetchAccountBalance()
    }
  }

  function resetState() {
    walletInfo.value = null
    balance.value = null
    status.value = null
  }

  return {
    foundWallets,
    status,
    scanWallets,
    initWallet,
    walletInfo,
    balance,
    aeSdk,
  }
})
