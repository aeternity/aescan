<template>
  <button @click="init()">
    Connect Wallet
  </button>
</template>
<script setup>

import { useWalletStore } from '~/stores/wallet'

const walletStore = useWalletStore()
// const {
//   initWallet,
// } = storeToRefs(walletStore)

const { initWallet } = walletStore

async function init() {
  await initWallet()
}
</script>
