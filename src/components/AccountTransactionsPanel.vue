<template>
  <app-panel class="account-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="accountTransactions"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>

      <account-transactions-table
        class="account-transactions-panel__account-transactions-table u-hidden-mobile"
        :account-transactions="accountTransactions"/>

      <account-transactions-table-condensed
        class="u-hidden-desktop"
        :account-transactions="accountTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { isDesktop } from '@/utils/screen'

const route = useRoute()
const accountStore = useAccountStore()
const { fetchAccountTransactions } = accountStore
const { accountTransactions } = storeToRefs(accountStore)

const selectedTxType = ref({ typeQuery: null, label: 'All types' })
const pageIndex = ref(1)

const limit = computed(() => isDesktop() ? 10 : 3)

watch(selectedTxType, () => {
  fetchAccountTransactions({
    accountId: route.params.id,
    limit: limit.value,
    type: selectedTxType.value.typeQuery,
  })
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
.account-transactions-panel__account-transactions-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
