<template>
  <app-panel class="names-active-panel">
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('names-active')

watch(pageLimit, () => {
  fetchActiveNames({ limit: pageLimit.value })
})

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
