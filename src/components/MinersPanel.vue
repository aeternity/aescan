<template>
  <app-panel class="miners-panel">
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('miners')

watch(pageLimit, () => {
  fetchMiners({ limit: pageLimit.value })
})

function loadPrevMiners() {
  fetchMiners({ queryParameters: miners.value.prev })
}

function loadNextMiners() {
  fetchMiners({ queryParameters: miners.value.next })
}

if (import.meta.client) {
  await fetchMiners({ limit: pageLimit.value })
}
</script>

<style scoped>
.miners-panel-panel__table {
  margin-bottom: var(--space-4);
}
</style>
