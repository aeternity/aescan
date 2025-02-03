<template>
  <app-panel>
    <paginated-content
      :entities="nftTransfers"
      pagination-style="history"
      :limit="limit"
      @prev-clicked="loadPrevNftTransfers"
      @next-clicked="loadNextNftTransfers">
      <nft-transfers-table :nft-transfers="nftTransfers"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftTransfers } = storeToRefs(useNftDetailsStore())
const { fetchNftTransfers } = useNftDetailsStore()

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadPrevNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.prev })
}

async function loadNextNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.next })
}
</script>
