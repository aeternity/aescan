<template>
  <app-panel>
    <template #title>
      DEX SWAPS
    </template>
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('dex-trades')

watch(pageLimit, () => {
  fetchDexTrades({ limit: pageLimit.value })
})

useAsyncData(async () => {
  await fetchDexTrades({ limit: pageLimit.value })
  return true
})

function loadPrevEvents() {
  fetchDexTrades({ queryParameters: trades.value.prev.substring(3) })
}

function loadNextEvents() {
  fetchDexTrades({ queryParameters: trades.value.next.substring(3) })
}

if (import.meta.client) {
  fetchDexTrades({ limit: pageLimit.value })
}
</script>
