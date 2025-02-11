<template>
  <app-panel>
    <paginated-content
      :entities="trades"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <dex-trades-table :trades="trades"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { trades } = storeToRefs(useDexTradesStore())
const { fetchDexTrades } = useDexTradesStore()

await useAsyncData(async() => {
  await fetchDexTrades()
  return true
})

function loadPrevEvents() {
  fetchDexTrades({ queryParameters: trades.value.prev })
}

function loadNextEvents() {
  fetchDexTrades({ queryParameters: trades.value.next })
}

if (process.client) {
  await fetchDexTrades()
}
</script>
