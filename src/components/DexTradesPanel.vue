<template>
  <app-panel>
    <paginated-content
      :entities="trades"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <dex-trades-table
        :trades="trades"
        class="u-hidden-mobile"/>
      <dex-trades-table-condensed
        :trades="trades"
        class="u-hidden-desktop"/>
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
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchDexTrades({
    limit: limit.value,
  })
}
</script>
