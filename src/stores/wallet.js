import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { AE_AMOUNT_FORMATS, AeSdkAepp, BrowserWindowMessageConnection, Node, walletDetector } from '@aeternity/aepp-sdk'

export const useWalletStore = defineStore('wallet', () => {
  const { NODE_URL } = useRuntimeConfig().public

  const walletInfo = ref(null)
  const aeSdk = ref(null)
  const balance = ref(null)

  async function initWallet() {
    // todo reuse instance
    const node = new Node(NODE_URL)
    try {
      const aeSdkOptions = {
        nodes: [
          { name: 'mainnet', instance: node },
        ],
        compilerUrl: 'https://compiler.aepps.com',
      }

      // connect to Superhero Wallet
      // AeSdkAepp instance can't be in deep reactive https://stackoverflow.com/a/69010240
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
      }))
      await scanForWallets()
    } catch (error) {
      console.log('failed')
      throw error
    }
  }

  async function scanForWallets() {
    const foundWallet = await new Promise(resolve => {
      const handleWallets = ({ newWallet }) => {
        stopScan()
        resolve(newWallet)
      }
      const scannerConnection = new BrowserWindowMessageConnection()
      const stopScan = walletDetector(scannerConnection, handleWallets)
    })

    walletInfo.value = await aeSdk.value.connectToWallet(foundWallet.getConnection())
    await aeSdk.value.subscribeAddress('subscribe', 'current')
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
    initWallet,
    walletInfo,
    balance,
    aeSdk,
  }
})
