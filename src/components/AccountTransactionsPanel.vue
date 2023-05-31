<template>
  <app-panel class="account-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="accountTransactions"
      :total-count="accountTransactionsCount"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>

      <account-transactions-table
        class="account-transactions-panel__account-transactions-table"
        :account-transactions="accountTransactions"/>

      <account-transactions-table-condensed
        class="account-transactions-panel__account-transactions-table-condensed"
        :account-transactions="accountTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useAccountStore } from '@/stores/accountDetails'
import AccountTransactionsTable from '@/components/AccountTransactionsTable'
import AccountTransactionsTableCondensed from '@/components/AccountTransactionsTableCondensed'
import TransactionsSelect from '@/components/TransactionsSelect'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'

const route = useRoute()
const accountStore = useAccountStore()
const { fetchAccountTransactions, fetchAccountTransactionsCount } = accountStore
const { accountTransactions, accountTransactionsCount } = storeToRefs(accountStore)

const selectedTxType = ref({ typeQuery: null, label: 'All types' })
const pageIndex = ref(1)

const limit = computed(() => isDesktop() ? 10 : 3)

fetchAccountTransactionsCount(route.params.id, selectedTxType.value.typeQuery)

watch(selectedTxType, () => {
  fetchAccountTransactions({
    accountId: route.params.id,
    limit: limit.value,
    type: selectedTxType.value.typeQuery,
  })
  fetchAccountTransactionsCount(route.params.id, selectedTxType.value.typeQuery)
  pageIndex.value = 1
})

function loadPrevTransactions() {
  fetchAccountTransactions({
    queryParameters: accountTransactions.value.prev,
  })
}

function loadNextTransactions() {
  fetchAccountTransactions({
    queryParameters: accountTransactions.value.next,
  })
}
</script>

<style scoped>
.account-transactions-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__account-transactions-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__account-transactions-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
