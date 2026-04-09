<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
      :entities="nftTransfers"
      pagination-style="history"
      @prev-clicked="loadPrevNftTransfers"
      @next-clicked="loadNextNftTransfers">
      <nft-transfers-table :nft-transfers="nftTransfers"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const route = useRoute()
const { nftTransfers } = storeToRefs(useNftDetailsStore())
const { fetchNftTransfers } = useNftDetailsStore()

const pageLimit = usePageLimit('nft-transfers')

watch(pageLimit, () => {
  fetchNftTransfers({ id: route.params.id, limit: pageLimit.value })
})

async function loadPrevNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.prev })
}

async function loadNextNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.next })
}
</script>
