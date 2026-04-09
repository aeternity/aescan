<template>
  <app-panel class="contracts-panel">
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('contracts')

watch(pageLimit, () => {
  loadContracts()
})

function loadPrevContracts() {
  fetchContracts({ queryParameters: contracts.value.prev })
}

function loadNextContracts() {
  fetchContracts({ queryParameters: contracts.value.next })
}

function loadContracts() {
  fetchContracts({ limit: pageLimit.value })
  fetchContractsCount()
}

if (import.meta.client) {
  loadContracts()
}
</script>
