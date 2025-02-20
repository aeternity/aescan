<template>
  <app-panel class="names-active-panel">
    <paginated-content
      :entities="activeNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-active-table
        v-if="activeNames"
        class="names-active-panel__names-active-table"
        :names="activeNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchActiveNames } = useNamesStore()
const { activeNames } = storeToRefs(useNamesStore())

function loadPrevNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.prev.substring(3) })
}

function loadNextNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.next.substring(3) })
}
</script>

<style scoped>
.names-active-panel__names-active-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
