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
  <template v-if="!isLoading">
    <wallet-connection-panel v-if="status !== 'connected'"/>
    <wallet-account-panel v-else/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from '#app'
import { useWalletStore } from '@/stores/wallet'
import { walletHints } from '@/utils/hints/walletHints'

const { push } = useRouter()

const walletStore = useWalletStore()
const { scanWallets, setBackLink } = walletStore
const { status, backLink } = storeToRefs(walletStore)

const { isLoading } = useLoading()

onBeforeMount(async () => {
  if (status.value !== 'connected') {
    await scanWallets()
  }
})

watch(status, newStatus => {
  if (newStatus === 'connected' && backLink.value) {
    push(backLink.value)
    setBackLink(null)
  }
})

</script>
