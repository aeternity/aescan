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
  await fetchNftsList({ queryParameters: nfts.value.prev })
}

async function loadNextNfts() {
  await fetchNftsList({ queryParameters: nfts.value.next })
}

if (process.client) {
  await fetchNfts({ queryParameters: '/aex141?limit=10&direction=backward&by=creation' })
}

</script>
