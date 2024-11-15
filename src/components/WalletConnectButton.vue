<template>
  <app-button @click="connectWallet()">
    Connect to Superhero Wallet
  </app-button>
</template>

<script setup>
import { useWalletStore } from '@/stores/wallet'

const walletStore = useWalletStore()
const { connectWallet } = walletStore
</script>
