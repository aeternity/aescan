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
import { walletHints } from '@/utils/hints/walletHints'

const { scanWallets, setBackLink } = useWalletStore()
const { status, backLink } = storeToRefs(useWalletStore())

const { push } = useRouter()

const { isLoading } = useLoading()

onBeforeMount(async() => {
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
