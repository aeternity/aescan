<template>
<!--  todo count-->
  <app-panel class="mining-pools-miners-panel">
    <paginated-content
      :entities="miners"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <mining-pools-miners-table
        :miners="miners"
        class="mining-pools-miners-panel__table u-hidden-mobile"/>
<!--      <mining-pools-miners-table-condensed-->
<!--        :miners="miners"-->
<!--        class="u-hidden-desktop"/>-->
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMinersStore } from '@/stores/miners'

const { miners } = storeToRefs(useMinersStore())
const { fetchMiners } = useMinersStore()

function loadPrevEvents() {
  fetchMiners({ queryParameters: miners.value.prev })
}

function loadNextEvents() {
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
.mining-pools-miners-panel-panel__table {
  margin-bottom: var(--space-4);
}
</style>
