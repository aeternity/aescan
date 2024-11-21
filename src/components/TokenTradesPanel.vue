<template>
  <app-panel class="token-trades-panel">
    <paginated-content
      :entities="tokenTrades"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <dex-trades-table
        :trades="tokenTrades"
        class="u-hidden-mobile"/>
      <dex-trades-table-condensed
        :trades="tokenTrades"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>

const tokenDetailsStore = useTokenDetailsStore()
const { tokenTrades } = storeToRefs(tokenDetailsStore)
const { fetchTokenTrades } = tokenDetailsStore
const route = useRoute()

function loadPrevEvents() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.prev })
}

function loadNextEvents() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchTokenTrades({
    contractId: route.params.id,
    limit: limit.value,
  })
}
</script>
