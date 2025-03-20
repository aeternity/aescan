<template>
  <app-panel class="miners-panel">
    <paginated-content
      :entities="miners"
      :total-count="minersCount"
      pagination-style="history"
      @prev-clicked="loadPrevMiners"
      @next-clicked="loadNextMiners">
      <miners-table
        :miners="miners"
        class="miners-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { miners, minersCount } = storeToRefs(useMiningStore())
const { fetchMiners } = useMiningStore()

function loadPrevMiners() {
  fetchMiners({ queryParameters: miners.value.prev })
}

function loadNextMiners() {
  fetchMiners({ queryParameters: miners.value.next })
}

if (process.client) {
  await fetchMiners()
}
</script>

<style scoped>
.miners-panel-panel__table {
  margin-bottom: var(--space-4);
}
</style>
