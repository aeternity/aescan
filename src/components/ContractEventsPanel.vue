<template>
  <app-panel class="contract-events-panel">
    <paginated-content
      v-model:limit="pageLimit"
      :entities="contractEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <contract-events-table
        v-if="contractEvents"
        :contract-details="contractDetails"
        :contract-events="contractEvents"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchContractEvents } = useContractDetailsStore()
const { contractEvents, contractDetails } = storeToRefs(useContractDetailsStore())

const pageLimit = usePageLimit('contract-events')

watch(pageLimit, () => {
  fetchContractEvents({ limit: pageLimit.value })
})

function loadPrevEvents() {
  fetchContractEvents({ queryParameters: contractEvents.value.prev.substring(3) })
}

function loadNextEvents() {
  fetchContractEvents({ queryParameters: contractEvents.value.next.substring(3) })
}
</script>
