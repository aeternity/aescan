<template>
  <app-panel>
    <br>
    {{ walletInfo }}
    <br>
    {{ balance }}
    <br>
  </app-panel>
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
