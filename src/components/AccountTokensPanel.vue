<template>
  <app-panel class="account-tokens-panel">
    <paginated-content
      :entities="accountTokens"
      @prev-clicked="loadPrevAccountTokens"
      @next-clicked="loadNextAccountTokens">
      <account-tokens-table
        class="u-hidden-mobile"
        :account-tokens="accountTokens"/>

      <account-tokens-table-condensed
        class="account-tokens-panel__account-tokens-table-condensed u-hidden-desktop"
        :account-tokens="accountTokens"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import AccountTokensTable from '@/components/AccountTokensTable'
import AccountTokensTableCondensed from '@/components/AccountTokensTableCondensed'
import { useAccountStore } from '@/stores/accountDetails'

const accountStore = useAccountStore()
const { fetchAccountTokens } = accountStore
const { accountTokens } = storeToRefs(accountStore)

async function loadPrevAccountTokens() {
  await fetchAccountTokens({ queryParameters: accountTokens.value.prev })
}

async function loadNextAccountTokens() {
  await fetchAccountTokens({ queryParameters: accountTokens.value.next })
}
</script>

<style scoped>
.account-tokens-panel__account-tokens-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
