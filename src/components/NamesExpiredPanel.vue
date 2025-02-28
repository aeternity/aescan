<template>
  <app-panel class="names-expired-panel">
    <paginated-content
      :entities="expiredNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-expired-table
        v-if="expiredNames"
        class="names-expired-panel__names-expired-table"
        :names="expiredNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchExpiredNames } = useNamesStore()
const { expiredNames } = storeToRefs(useNamesStore())

function loadPrevNames() {
  fetchExpiredNames({ queryParameters: expiredNames.value.prev.substring(3) })
}

function loadNextNames() {
  fetchExpiredNames({ queryParameters: expiredNames.value.next.substring(3) })
}
</script>

<style scoped>
.names-expired-panel__names-expired-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
