<template>
  <app-button @click="initWallet()">
    Connect to Superhero Wallet
  </app-button>
</template>

<script setup>
import { useWalletStore } from '@/stores/wallet'

const walletStore = useWalletStore()
const { initWallet } = walletStore
</script>
