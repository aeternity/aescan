<template>
  <div class="">
    Wallet
    <wallet-connect-button/>
    <br>
    {{ walletInfo }}
    <br>
    {{ balance }}
    <br>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const walletStore = useWalletStore()

const {
  walletInfo,
  balance,
} = storeToRefs(walletStore)
</script>
