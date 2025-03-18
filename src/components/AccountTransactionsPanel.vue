<template>
  <app-panel class="account-transactions-panel">
    <paginated-content
      :entities="accountTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>
      <account-transactions-table
        class="account-transactions-panel__account-transactions-table"
        :account-transactions="accountTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

const route = useRoute()
const { fetchAccountTransactions } = useAccountStore()
const { accountTransactions } = storeToRefs(useAccountStore())

const selectedTxType = ref({ typeQuery: null, label: 'All types' })

watch(selectedTxType, () => {
  fetchAccountTransactions({
    accountId: route.params.id,
    type: selectedTxType.value.typeQuery,
  })
})

function loadPrevTransactions() {
  fetchAccountTransactions({
    queryParameters: accountTransactions.value.prev.substring(3),
  })
}

function loadNextTransactions() {
  fetchAccountTransactions({
    queryParameters: accountTransactions.value.next.substring(3),
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
