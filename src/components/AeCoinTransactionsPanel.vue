<template>
  <app-panel class="ae-coin-transactions-panel">
    <paginated-content
      :entities="transactions"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <transactions-table :transactions="transactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchTransactions } = useTransactionsStore()
const { transactions } = storeToRefs(useTransactionsStore())

async function loadTransactions() {
  await fetchTransactions(`/transactions?limit=10${'&type=' + 'spend'}`)
}

await useAsyncData(async() => {
  await loadTransactions()
  return true
})

function loadPrevTransactions() {
  fetchTransactions(transactions.value.prev)
}

function loadNextTransactions() {
  fetchTransactions(transactions.value.next)
}
</script>
