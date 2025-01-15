<template>
  <app-panel class="token-trades-panel">
    <paginated-content
      :entities="tokenTrades"
      pagination-style="history"
      @prev-clicked="loadPrevTrades"
      @next-clicked="loadNextTrades">
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

function loadPrevTrades() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.prev })
}

function loadNextTrades() {
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
