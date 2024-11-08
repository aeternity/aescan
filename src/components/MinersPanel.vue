<template>
  <!--  todo count-->
  <app-panel class="miners-panel">
    <paginated-content
      :entities="miners"
      :total-count="minersCount"
      pagination-style="history"
      @prev-clicked="loadPrevMiners"
      @next-clicked="loadNextMiners">
      <miners-table
        :miners="miners"
        class="miners-panel__table u-hidden-mobile"/>
      <!--      <miners-table-condensed-->
      <!--        :miners="miners"-->
      <!--        class="u-hidden-desktop"/>-->
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMinersStore } from '@/stores/miners'

const { miners, minersCount } = storeToRefs(useMinersStore())
const { fetchMiners } = useMinersStore()

function loadPrevMiners() {
  fetchMiners({ queryParameters: miners.value.prev })
}

function loadNextMiners() {
  // todo param
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
