<template>
  <app-panel class="contracts-panel">
    <paginated-content
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

function loadPrevContracts() {
  fetchContracts(contracts.value.prev)
}

function loadNextContracts() {
  fetchContracts(contracts.value.next)
}

function loadContracts() {
  fetchContracts('/v3/transactions?type=contract_create&limit=10')
  fetchContractsCount()
}

if (process.client) {
  loadContracts()
}

</script>
