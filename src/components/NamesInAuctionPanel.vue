<template>
  <app-panel class="names-in-auction-panel">
    <paginated-content
      :entities="inAuctionNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-in-auction-table
        v-if="inAuctionNames"
        class="names-in-auction-panel__names-in-auction-table"
        :names="inAuctionNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchInAuctionNames } = useNamesStore()
const { inAuctionNames } = storeToRefs(useNamesStore())

function loadPrevNames() {
  fetchInAuctionNames({ queryParameters: inAuctionNames.value.prev })
}

function loadNextNames() {
  fetchInAuctionNames({ queryParameters: inAuctionNames.value.next })
}
</script>

<style scoped>
.names-in-auction-panel__names-in-auction-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
