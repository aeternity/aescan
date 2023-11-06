<template>
  <account-details-panel
    v-if="accountDetails"
    class="wallet-account-panel__account-details-panel"
    :account-details="accountDetails"/>

  <client-only>
    <app-tabs
      v-if="isTabsVisible"
      v-model="activeTabIndex">
      <app-tab title="Activities">
        <account-activities-panel/>
      </app-tab>
      <app-tab title="Transactions">
        <account-transactions-panel/>
      </app-tab>
      <app-tab title="AENS Names">
        <account-names-panel/>
      </app-tab>
      <app-tab
        title="Tokens"
        :is-preselected="isTokensTabSelected">
        <account-tokens-panel/>
      </app-tab>
    </app-tabs>
  </client-only>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'nuxt/app'
import { useWalletStore } from '@/stores/wallet'
import { useAccountStore } from '@/stores/accountDetails'
import { isDesktop } from '@/utils/screen'

const walletStore = useWalletStore()
const accountStore = useAccountStore()
const { aeSdk } = storeToRefs(walletStore)
const { accountDetails, accountTokens } = storeToRefs(accountStore)
const { fetchAccount } = accountStore

const TAB_KEYS = ['activities', 'transactions', 'aens-names', 'tokens']

const { push, replace } = useRouter()

const route = useRoute()

const isTabsVisible = computed(() => process.client &&
    ((accountDetails.value && !accountDetails.value?.notExistent) ||
        !!accountTokens.value?.data.length))

const isTokensTabSelected = computed(() => process.client &&
    accountDetails.value?.notExistent &&
    !!accountTokens.value?.data.length)

const activeTabIndex = computed({
  get() {
    const { type: activeTabName } = route.query

    if (activeTabName === undefined) {
      return 0
    }

    return TAB_KEYS.indexOf(activeTabName)
  },
  set(index) {
    const newRoute = {
      query: {
        type: TAB_KEYS[index],
      },
    }

    if (activeTabIndex.value === index) {
      // if navigating back
      return replace(newRoute)
    }

    return push(newRoute)
  },
})

if (process.client) {
  const limit = isDesktop() ? null : 3
  await fetchAccount(aeSdk.value.address, { limit })
  watch(() => aeSdk.value.address, async() => {
    await fetchAccount(aeSdk.value.address, { limit })
  })
}
</script>

<style scoped>
.wallet-account-panel__account-details-panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
