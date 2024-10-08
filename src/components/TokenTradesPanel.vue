<template>
  <app-panel class="token-trades-panel">
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

const tokenDetailsStore = useTokenDetailsStore()
const { trades } = storeToRefs(tokenDetailsStore)
const { fetchTokenTrades } = tokenDetailsStore
const route = useRoute()

function loadPrevEvents() {
  fetchTokenTrades({ queryParameters: trades.value.prev })
}

function loadNextEvents() {
  fetchTokenTrades({ queryParameters: trades.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchTokenTrades({
    contractId: route.params.id,
    limit: limit.value,
  })
}
</script>
