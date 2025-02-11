<template>
  <app-panel class="contract-call-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :total-count="contractCallsCount"
      :entities="contractCallTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <contract-call-transactions-table :contract-call-transactions="contractCallTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { contractCallTransactions, contractCallsCount } = storeToRefs(useContractDetailsStore())
const { fetchContractCallTransactions } = useContractDetailsStore()

const pageIndex = ref(1)

const loadPrevTransactions = () => {
  fetchContractCallTransactions({
    queryParameters: contractCallTransactions.value.prev,
  })
}
const loadNextTransactions = () => {
  fetchContractCallTransactions({
    queryParameters: contractCallTransactions.value.next,
  })
}

if (process.client) {
  fetchContractCallTransactions()
}
</script>
