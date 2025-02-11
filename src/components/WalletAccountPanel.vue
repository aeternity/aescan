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
const { address } = storeToRefs(useWalletStore())

const { accountDetails, accountTokens } = storeToRefs(useAccountStore())
const { fetchAccount } = useAccountStore()

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
  const limit = 10
  watch(address, () => fetchAccount(address.value, { limit }), { immediate: true })
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
