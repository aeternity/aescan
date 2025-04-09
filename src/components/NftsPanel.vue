<template>
  <app-panel>
    <paginated-content
      :entities="nfts"
      :total-count="nfts?.count"
      @prev-clicked="loadPrevNfts"
      @next-clicked="loadNextNfts">
      <nfts-table :nfts="nfts"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nfts } = storeToRefs(useNftsStore())
const { fetchNfts } = useNftsStore()

async function loadPrevNfts() {
  await fetchNfts(nfts.value.prev)
}

async function loadNextNfts() {
  await fetchNfts(nfts.value.next)
}

if (process.client) {
  fetchNfts()
}
</script>
