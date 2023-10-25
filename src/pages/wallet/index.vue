<template>
  <app-panel class="">
    <div v-if="balance">
      <br>
      {{ walletInfo }}
      <br>
      {{ balance }}
      <br>
    </div>
    <div v-else>
      <wallet-connect-button/>
    </div>
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
