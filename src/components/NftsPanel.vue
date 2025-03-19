<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
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

const pageIndex = ref(1)

async function loadPrevNfts() {
  await fetchNfts(nfts.value.prev)
}

async function loadNextNfts() {
  await fetchNfts(nfts.value.next)
}

if (process.client) {
  await fetchNfts()
}
</script>
