<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="nfts"
      :total-count="nftsCount"
      @prev-clicked="loadPrevNfts"
      @next-clicked="loadNextNfts">
      <nfts-table :nfts="nfts"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nfts, nftsCount } = storeToRefs(useNftsStore())
const { fetchNfts, fetchNftsList } = useNftsStore()

const pageIndex = ref(1)

async function loadPrevNfts() {
  await fetchNftsList(nfts.value.prev.substring(3))
}

async function loadNextNfts() {
  await fetchNftsList(nfts.value.next.substring(3))
}

if (process.client) {
  await fetchNfts('/aex141?limit=10&direction=backward&by=creation')
}
</script>
