<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('nfts')

watch(pageLimit, () => {
  fetchNfts({ limit: pageLimit.value })
})

async function loadPrevNfts() {
  await fetchNfts({ queryParameters: nfts.value.prev })
}

async function loadNextNfts() {
  await fetchNfts({ queryParameters: nfts.value.next })
}

if (import.meta.client) {
  fetchNfts({ limit: pageLimit.value })
}
</script>
