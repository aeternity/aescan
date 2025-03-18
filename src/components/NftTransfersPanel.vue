<template>
  <app-panel>
    <paginated-content
      :entities="nftTransfers"
      pagination-style="history"
      @prev-clicked="loadPrevNftTransfers"
      @next-clicked="loadNextNftTransfers">
      <nft-transfers-table :nft-transfers="nftTransfers"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftTransfers } = storeToRefs(useNftDetailsStore())
const { fetchNftTransfers } = useNftDetailsStore()

async function loadPrevNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.prev.substring(3) })
}

async function loadNextNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.next.substring(3) })
}
</script>
