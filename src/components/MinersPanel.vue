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
import { storeToRefs } from 'pinia'
import { useMinersStore } from '@/composables/miners'

const { miners, minersCount } = storeToRefs(useMinersStore())
const { fetchMiners } = useMinersStore()

function loadPrevMiners() {
  fetchMiners({ queryParameters: miners.value.prev })
}

function loadNextMiners() {
  // todo report MDW
  fetchMiners({ queryParameters: miners.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchMiners({
    limit: limit.value,
  })
}
</script>

<style scoped>
.miners-panel-panel__table {
  margin-bottom: var(--space-4);
}
</style>
