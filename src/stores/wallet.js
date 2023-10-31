import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { AE_AMOUNT_FORMATS, AeSdkAepp, BrowserWindowMessageConnection, Node, walletDetector } from '@aeternity/aepp-sdk'

export const useWalletStore = defineStore('wallet', () => {
  const { NODE_URL } = useRuntimeConfig().public

  const walletInfo = ref(null)
  const aeSdk = ref(null)
  const balance = ref(null)
  const foundWallets = ref(null)
  const status = ref(null)

  async function initWallet() {
    console.log('init')
    // todo reuse instance
    // todo improve naming
    const node = new Node(NODE_URL)
    try {
      const aeSdkOptions = {
        nodes: [
          { name: 'mainnet', instance: node },
        ],
        compilerUrl: 'https://compiler.aepps.com',
      }

      aeSdk.value = shallowReactive(new AeSdkAepp({
        name: 'AEPP',
        ...aeSdkOptions,
        async onNetworkChange({ NETWORK_ID }) {
          await connectToNode(NETWORK_ID)
        },
        async onAddressChange(addresses) {
          console.info('onAddressChange ::', addresses)
          await fetchAccountInfo()
        },
        onDisconnect() {
          status.value = false
          walletInfo.value = null
          balance.value = null
        },
      }))
      await connect()
    } catch (error) {
      console.log('failed')
      throw error
    }
  }

  async function scanWallets() {
    console.log('scan')

    status.value = 'scanning'
    foundWallets.value = await new Promise(resolve => {
      const timeout = setTimeout(() => {
        status.value = 'not installed'
        resolve(undefined)
      }, 10000)

      const handleWallets = ({ newWallet }) => {
        status.value = 'found'
        clearTimeout(timeout)
        stopScan()
        resolve(newWallet)
      }
      const scannerConnection = new BrowserWindowMessageConnection()
      const stopScan = walletDetector(scannerConnection, handleWallets)
    })
  }

  async function connect() {
    console.log('connect')

    walletInfo.value = await aeSdk.value.connectToWallet(foundWallets.value.getConnection())
    await aeSdk.value.subscribeAddress('subscribe', 'current')
    status.value = 'connected'

    await fetchAccountInfo()
  }

  // todo infra envs
  async function fetchAccountInfo() {
    balance.value = await aeSdk.value.getBalance(aeSdk.value.address, {
      format: AE_AMOUNT_FORMATS.AE,
    })
  }

  async function connectToNode(selectedNetworkId) {
    aeSdk.value.selectNode(selectedNetworkId)
    if (aeSdk.value.addresses().length) {
      await fetchAccountInfo()
    }
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
