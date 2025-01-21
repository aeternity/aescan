<template>
  <app-panel class="ae-coin-transactions-panel">
    <paginated-content
      :entities="transactions"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <transactions-table
        :transactions="transactions"
        class="u-hidden-mobile"/>
      <transactions-table-condensed
        :transactions="transactions"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

const transactionsStore = useTransactionsStore()
const { fetchTransactions } = transactionsStore
const { transactions } = storeToRefs(transactionsStore)

const limit = computed(() => isDesktop() ? 10 : 3)

async function loadTransactions() {
  await fetchTransactions(`/v3/transactions?limit=${limit.value}${'&type=' + 'spend'}`)
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
