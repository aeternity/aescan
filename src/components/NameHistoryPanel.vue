<template>
  <app-panel class="name-history-panel">
    <paginated-content
      :entities="nameHistory"
      pagination-style="history"
      @prev-clicked="loadPrevActions"
      @next-clicked="loadNextActions">
      <name-history-table
        v-if="nameHistory"
        class="name-history-panel__name-history-table"
        :actions="nameHistory"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchNameHistory } = useNameDetailsStore()
const { nameHistory } = storeToRefs(useNameDetailsStore())

function loadPrevActions() {
  return fetchNameHistory({ queryParameters: nameHistory.value.prev.substring(3) })
}

function loadNextActions() {
  return fetchNameHistory({ queryParameters: nameHistory.value.next.substring(3) })
}
</script>

<style scoped>
.name-history-panel__name-history-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
