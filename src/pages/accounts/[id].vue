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
          :is-preselected="isTokensTabSelected">
          <account-tokens-panel/>
        </app-tab>
      </app-tabs>
    </client-only>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'nuxt/app'
import { useAccountStore } from '@/stores/accountDetails'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import AccountActivitiesPanel from '@/components/AccountActivitiesPanel'
import AccountTransactionsPanel from '@/components/AccountTransactionsPanel'
import AccountNamesPanel from '@/components/AccountNamesPanel'
import AccountTokensPanel from '@/components/AccountTokensPanel'
import PageHeader from '@/components/PageHeader'
import AccountDetailsPanel from '@/components/AccountDetailsPanel'
import { accountHints } from '@/utils/hints/accountHints'
import { isDesktop } from '@/utils/screen'

const TAB_KEYS = ['activities', 'transactions', 'aens-names', 'tokens']

const { isLoading } = useLoading()
const { push, replace } = useRouter()

const accountStore = useAccountStore()
const { accountDetails, accountTokens } = storeToRefs(accountStore)
const { fetchAccount } = accountStore
const route = useRoute()

const isTabsVisible = computed(() => process.client &&
    ((accountDetails.value && !!accountDetails.value.isExistent) ||
        !!accountTokens.value?.data.length))

const isTokensTabSelected = computed(() => process.client &&
    accountDetails.value?.isExistent === false &&
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
  await fetchAccount(route.params.id, { limit })
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
