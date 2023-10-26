<template>
  <app-button @click="init()">
    Connect Wallet
  </app-button>
</template>

<script setup>
import { useWalletStore } from '~/stores/wallet'

const walletStore = useWalletStore()
const { initWallet } = walletStore

async function init() {
  await initWallet()
}
</script>
