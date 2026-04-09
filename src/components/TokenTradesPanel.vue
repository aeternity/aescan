<template>
  <app-panel class="token-trades-panel">
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('token-trades')

watch(pageLimit, () => {
  fetchTokenTrades({ contractId: route.params.id, limit: pageLimit.value })
})

function loadPrevTrades() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.prev.substring(3) })
}

function loadNextTrades() {
  fetchTokenTrades({ queryParameters: tokenTrades.value.next.substring(3) })
}

if (import.meta.client) {
  fetchTokenTrades({
    contractId: route.params.id,
    limit: pageLimit.value,
  })
}
</script>
