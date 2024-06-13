<template>
  <app-panel>
    <paginated-content
      :entities="trades"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <dex-trades-table :trades="trades"/>
      <!--    todo remove opt chaining-->
    </paginated-content>
  </app-panel>
</template>
<script setup>

import { useDexTradesStore } from '~/stores/dexTrades'

const dexTradesStore = useDexTradesStore()
const { trades } = storeToRefs(dexTradesStore)
const { fetchTrades } = dexTradesStore

await useAsyncData(async() => {
  await fetchTrades()
  return true
})

function loadPrevEvents() {
  fetchTrades({ queryParameters: trades.value.prev })
}

function loadNextEvents() {
  fetchTrades({ queryParameters: trades.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchTrades({
    limit: limit.value,
  })
}

</script>
