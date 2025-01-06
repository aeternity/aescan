<template>
  <app-panel class="account-names-panel">
    <paginated-content
      :entities="accountNames"
      @prev-clicked="loadPrevAccountNames"
      @next-clicked="loadNextAccountNames">
      <account-names-table
        class="account-names-panel__account-names-table u-hidden-mobile"
        :account-names="accountNames"/>

      <account-names-table-condensed
        class="u-hidden-desktop"
        :account-names="accountNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import AccountNamesTable from '@/components/AccountNamesTable'
import AccountNamesTableCondensed from '@/components/AccountNamesTableCondensed'
import { useAccountStore } from '@/stores/accountDetails'

const accountStore = useAccountStore()
const { fetchAccountNames } = accountStore
const { accountNames } = storeToRefs(accountStore)

// const route = useRoute()

async function loadPrevAccountNames() {
  await fetchAccountNames({ queryParameters: accountNames.value.prev })
}

async function loadNextAccountNames() {
  await fetchAccountNames({ queryParameters: accountNames.value.next })
}

// if (process.client) {
//   // todo pass params
//   const limit = computed(() => isDesktop() ? 10 : 3)
//   fetchAccountNames({ accountId: route.params.id, limit })
//   // fetchOracleEvents(`/v3/oracles/${route.params.id}/responses?limit=${limit.value}`)
// }

</script>

<style scoped>
.account-names-panel__account-names-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
