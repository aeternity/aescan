<template>
  <app-panel class="names-active-panel">
    <paginated-content
      :entities="activeNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-active-table
        v-if="activeNames"
        class="names-active-panel__names-active-table u-hidden-mobile"
        :names="activeNames"/>

      <names-active-table-condensed
        v-if="activeNames"
        class="u-hidden-desktop"
        :names="activeNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchActiveNames } = useNamesStore()
const { activeNames } = storeToRefs(useNamesStore())

function loadPrevNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.prev })
}

function loadNextNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.next })
}
</script>

<style scoped>
.names-active-panel__names-active-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
