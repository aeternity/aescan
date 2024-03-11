<template>
  <app-button
    size="lg"
    @click="initWallet()">
    Connect Wallet
  </app-button>
</template>

<script setup>
import { useWalletStore } from '@/stores/wallet'

const walletStore = useWalletStore()
const { initWallet } = walletStore
</script>
