<template>
  <app-panel class="contracts-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="contracts"
      :total-count="contractsCount"
      pagination-style="history"
      @prev-clicked="loadPrevContracts"
      @next-clicked="loadNextContracts">
      <contracts-table :contracts="contracts"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { contracts, contractsCount } = storeToRefs(useContractsStore())
const { fetchContracts, fetchContractsCount } = useContractsStore()

const pageIndex = ref(1)

const loadPrevContracts = () => {
  fetchContracts(contracts.value.prev)
}
const loadNextContracts = () => {
  fetchContracts(contracts.value.next)
}

const loadContracts = () => {
  fetchContracts('/transactions?type=contract_create&limit=10')
  fetchContractsCount()
  pageIndex.value = 1
}

if (process.client) {
  loadContracts()
}

</script>
