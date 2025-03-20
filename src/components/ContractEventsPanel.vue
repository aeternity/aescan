<template>
  <app-panel class="contract-events-panel">
    <paginated-content
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

function loadPrevEvents() {
  fetchContractEvents(contractEvents.value.prev.sxubstring(3))
}

function loadNextEvents() {
  fetchContractEvents(contractEvents.value.next.substring(3))
}
</script>
