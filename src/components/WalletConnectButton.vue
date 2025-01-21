<template>
  <app-button @click="connectWallet()">
    Connect to Superhero Wallet
  </app-button>
</template>

<script setup>
const walletStore = useWalletStore()
const { connectWallet } = walletStore
</script>
