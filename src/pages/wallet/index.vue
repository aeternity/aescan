<template>
  <Head>
    <Title>Wallet Account</Title>
  </Head>

  <page-header>
    Wallet Account
    <template #tooltip>
      {{ walletHints.wallet }}
    </template>
  </page-header>

  <wallet-account-panel v-if="status === 'connected'"/>
  <wallet-connection-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { walletHints } from '~/utils/hints/walletHints'
// todo fix imports

const walletStore = useWalletStore()
const { scanWallets } = walletStore
const { status } = storeToRefs(walletStore)

// todo status connecting

onBeforeMount(async() => {
  if (status.value !== 'connected') {
    await scanWallets()
  }
})
</script>
