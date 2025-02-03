<template>
  <app-panel class="contracts-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="contracts"
      :total-count="contractsCount"
      :limit="limit"
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

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const loadPrevContracts = () => {
  fetchContracts(contracts.value.prev)
}
const loadNextContracts = () => {
  fetchContracts(contracts.value.next)
}

const loadContracts = () => {
  fetchContracts(`/v3/transactions?type=contract_create&limit=${limit.value}`)
  fetchContractsCount()
  pageIndex.value = 1
}

if (process.client) {
  loadContracts()
}

</script>
