<template>
  <app-panel class="name-history-panel">
    <paginated-content
      :entities="nameActions"
      pagination-style="history"
      @prev-clicked="loadPrevActions"
      @next-clicked="loadNextActions">
      <name-history-table
        v-if="nameActions"
        class="name-history-panel__name-history-table"
        :actions="nameActions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchNameActions } = useNameDetailsStore()
const { nameActions } = storeToRefs(useNameDetailsStore())

function loadPrevActions() {
  return fetchNameActions({ queryParameters: nameActions.value.prev })
}

function loadNextActions() {
  return fetchNameActions({ queryParameters: nameActions.value.next })
}
</script>

<style scoped>
.name-history-panel__name-history-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
