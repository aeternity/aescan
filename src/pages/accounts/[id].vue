<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Account</Title>
  </Head>

  <page-header>
    Account
  </page-header>

  <account-details-panel
    v-if="accountDetails"
    :account-details="accountDetails"/>

  <client-only>
    <app-tabs v-if="isTabsVisible">
      <app-tab title="Transactions">
        <account-transactions-panel/>
      </app-tab>
      <app-tab title="AENS Names">
        <account-names-panel/>
      </app-tab>
    </app-tabs>
  </client-only>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import { useAccountStore } from '@/stores/accountDetails'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import AccountTransactionsPanel from '@/components/AccountTransactionsPanel'
import AccountNamesPanel from '@/components/AccountNamesPanel'
import PageHeader from '@/components/PageHeader'
import AccountDetailsPanel from '@/components/AccountDetailsPanel'
import { isDesktop } from '@/utils/screen'

const accountStore = useAccountStore()
const { accountDetails } = storeToRefs(accountStore)
const { fetchAccount, fetchTotalAccountTransactionsCount } = accountStore
const route = useRoute()
const isTabsVisible = computed(() => process.client && accountDetails && !accountDetails.value?.notExistent)

if (process.client) {
  const limit = isDesktop() ? null : 3
  await useAsyncData(async() => {
    await fetchAccount(route.params.id, { limit })
    await fetchTotalAccountTransactionsCount(route.params.id)
    return true
  })
}
</script>
