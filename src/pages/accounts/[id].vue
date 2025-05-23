<template>
  <Head>
    <Title>Account</Title>
  </Head>

  <page-header>
    Account
    <template #tooltip>
      {{ accountHints.account }}
    </template>
  </page-header>

  <template v-if="!isLoading">
    <account-details-panel
      class="account__account-details-panel"
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
          :is-preselected="isTokensTabPreselected">
          <account-tokens-panel/>
        </app-tab>
      </app-tabs>
    </client-only>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { accountHints } from '@/utils/hints/accountHints'

const TAB_KEYS = ['activities', 'transactions', 'aens-names', 'tokens']

const { accountDetails, accountTokens } = storeToRefs(useAccountStore())
const { fetchAccount } = useAccountStore()

const { isLoading } = useLoading()
const { push, replace } = useRouter()
const route = useRoute()

const isAccountExistent = computed(() => {
  return accountDetails.value && accountDetails.value.isExistent !== false
})

const isTabsVisible = computed(() => import.meta.client
  && (isAccountExistent.value || !!accountTokens.value?.data.length),
)

const isTokensTabPreselected = computed(() => import.meta.client
  && !isAccountExistent.value && !!accountTokens.value?.data.length,
)

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

if (import.meta.client) {
  await fetchAccount(route.params.id)
}
</script>

<style scoped>
.account__account-details-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
