<template>
  <app-panel class="name-history-panel">
    <paginated-content
      :entities="nameActions"
      pagination-style="history"
      @prev-clicked="loadPrevActions"
      @next-clicked="loadNextActions">
      <name-history-table
        v-if="nameActions"
        class="name-history-panel__name-history-table u-hidden-mobile"
        :actions="nameActions"/>

      <name-history-table-condensed
        v-if="nameActions"
        class="u-hidden-desktop"
        :actions="nameActions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

const nameDetailsStore = useNameDetailsStore()
const { fetchNameActions } = nameDetailsStore
const { nameActions } = storeToRefs(nameDetailsStore)

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
