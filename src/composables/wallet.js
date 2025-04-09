import { useRuntimeConfig } from 'nuxt/app'
import { AeSdk, BrowserWindowMessageConnection, Node, WalletConnectorFrame, walletDetector } from '@aeternity/aepp-sdk'

export const useWalletStore = defineStore('wallet', () => {
  const { NODE_URL, NETWORK_ID } = useRuntimeConfig().public
  const aeSdk = new AeSdk({
    nodes: [{ name: NETWORK_ID, instance: new Node(NODE_URL.slice(0, -3)) }],
  })

  let wallet = null
  let connector = null
  const status = ref(null)
  const address = ref(null)
  const backLink = ref(null)

  async function scanWallets() {
    status.value = 'detecting'

    wallet = await Promise.race([
      new Promise(resolve => {
        const stopScan = walletDetector(
          new BrowserWindowMessageConnection(),
          ({ newWallet }) => {
            stopScan()
            resolve(newWallet)
          },
        )
      }),
      new Promise(resolve => setTimeout(() => resolve(undefined), 10000)),
    ])

    if (wallet == null) {
      status.value = 'not detected'
      return
    }

    status.value = wallet.info.networkId === NETWORK_ID ? 'detected' : 'not connected'
  }

  async function connectWallet() {
    status.value = 'connecting'
    try {
      connector = await WalletConnectorFrame.connect('æScan', wallet.getConnection())
      connector.addListener('accountsChange', accounts => {
        if (aeSdk.addresses().length) {
          aeSdk.removeAccount(aeSdk.address)
        }
        aeSdk.addAccount(accounts[0], { select: true })
        address.value = aeSdk.address
      })
      connector.addListener('networkIdChange', networkId => {
        if (networkId !== NETWORK_ID) {
          disconnect()
          scanWallets()
        }
      })
      connector.addListener('disconnect', () => {
        status.value = 'disconnecting'
        disconnect()
      })
      await connector.subscribeAccounts('subscribe', 'current')
      status.value = 'connected'
    } catch (error) {
      console.error(error)

      disconnect()
      status.value = 'denied'
    }
  }

  function disconnect() {
    if (aeSdk.addresses().length) {
      aeSdk.removeAccount(aeSdk.address)
    }
    connector.removeAllListeners()
    try {
      connector.disconnect()
    } catch (error) {
      console.error(error)
    }
    connector = undefined
  }

  function setBackLink(link) {
    backLink.value = link
  }

  return {
    status,
    scanWallets,
    connectWallet,
    disconnect,
    aeSdk: computed(() => aeSdk),
    address,
    backLink,
    setBackLink,
  }
})
