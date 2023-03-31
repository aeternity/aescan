<template>
  <div class="account-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Account</Title>
    </Head>
    <div
      v-if="accountDetails"
      class="account-details__parallax">
      <page-header class="account-details__header">
        Account
      </page-header>

      <account-details-panel :account-details="accountDetails"/>

      <app-tabs v-if="!accountDetails.notExistent">
        <app-tab title="Transactions">
          <account-transactions-panel/>
        </app-tab>
        <app-tab title="AENS Names">
          <account-names-panel/>
        </app-tab>
      </app-tabs>
    </div>
  </div>
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

if (process.client) {
  const limit = isDesktop() ? null : 3
  await fetchAccount(route.params.id, { limit })
  await fetchTotalAccountTransactionsCount(route.params.id)
}
</script>

<style scoped>
.account-details {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    margin: 0 var(--space-1) var(--space-7);
    @media (--desktop) {
      margin: 0 0 var(--space-5);
    }
  }
}
</style>
