<template>
  <app-panel class="oracle-events-panel">
    <paginated-content
      :entities="oracleEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <oracle-events-table
        :oracle-events="oracleEvents"
        class="oracle-events-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { oracleEvents } = storeToRefs(useOracleDetailsStore())
const { fetchOracleEvents } = useOracleDetailsStore()

const route = useRoute()

function loadPrevEvents() {
  fetchOracleEvents({ queryParameters: oracleEvents.value.prev })
}

function loadNextEvents() {
  fetchOracleEvents({ queryParameters: oracleEvents.value.next })
}

if (process.client) {
  fetchOracleEvents({ limit: 10, id: route.params.id })
}
</script>

<style scoped>
.oracle-events-panel__table {
  margin-bottom: var(--space-4);
}
</style>
