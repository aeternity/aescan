<template>
  <Head>
    <Title>Wallet Account</Title>
  </Head>

  <page-header>
    Wallet Account
    <template #tooltip>
      <!--      todo fix hint-->
      {{ transactionsHints.transaction }}
    </template>
  </page-header>

  <wallet-account-panel v-if="status === 'connected'"/>
  <wallet-connection-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { transactionsHints } from '~/utils/hints/transactionsHints'

const walletStore = useWalletStore()
const { scanWallets } = walletStore
const { status, aeSdk } = storeToRefs(walletStore)

onBeforeMount(async() => {
  if (!aeSdk) {
    await scanWallets()
  }
})
</script>
