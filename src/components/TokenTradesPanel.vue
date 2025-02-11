<template>
  <app-panel class="token-trades-panel">
    <paginated-content
      :entities="tokenTrades"
      pagination-style="history"
      @prev-clicked="loadPrevTrades"
      @next-clicked="loadNextTrades">
      <dex-trades-table :trades="tokenTrades"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { tokenTrades } = storeToRefs(useTokenDetailsStore())
const { fetchTokenTrades } = useTokenDetailsStore()

const route = useRoute()

function loadPrevTrades() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.prev })
}

function loadNextTrades() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.next })
}

if (process.client) {
  await fetchTokenTrades({
    contractId: route.params.id,
  })
}
</script>
