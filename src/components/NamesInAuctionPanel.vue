<template>
  <div class="names-in-auction-panel">
    <paginated-content
      v-model:limit="pageLimit"
      card
      :entities="inAuctionNames"
      :total-count="namesInAuctionCount"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-in-auction-table
        v-if="inAuctionNames"
        :names="inAuctionNames"/>
    </paginated-content>
  </div>
</template>

<script setup>
const { fetchInAuctionNames } = useNamesStore()
const { inAuctionNames } = storeToRefs(useNamesStore())

const { namesInAuctionCount } = storeToRefs(useBlockchainStatsStore())

const pageLimit = usePageLimit('names-in-auction')

watch(pageLimit, () => {
  fetchInAuctionNames({ limit: pageLimit.value })
})

function loadPrevNames() {
  fetchInAuctionNames({ queryParameters: inAuctionNames.value.prev })
}

function loadNextNames() {
  fetchInAuctionNames({ queryParameters: inAuctionNames.value.next })
}
</script>
