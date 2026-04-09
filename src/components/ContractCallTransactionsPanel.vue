<template>
  <app-panel class="contract-call-transactions-panel">
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('contract-call-transactions')

watch(pageLimit, () => {
  fetchContractCallTransactions({ limit: pageLimit.value })
})

function loadPrevTransactions() {
  fetchContractCallTransactions({
    queryParameters: contractCallTransactions.value.prev.substring(3),
  })
}

function loadNextTransactions() {
  fetchContractCallTransactions({
    queryParameters: contractCallTransactions.value.next.substring(3),
  })
}

if (import.meta.client) {
  fetchContractCallTransactions({ limit: pageLimit.value })
}
</script>
