<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
      :entities="nftsResults"
      @prev-clicked="loadPrevNfts"
      @next-clicked="loadNextNfts">
      <search-nfts-table :nfts="nftsResults"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftsResults } = storeToRefs(useSearchStore())
const { fetchNftsResults } = useSearchStore()

const route = useRoute()

const pageLimit = usePageLimit('search-nfts')

watch(pageLimit, () => {
  fetchNftsResults({ query: route.params.id, limit: pageLimit.value })
})

fetchNftsResults({ query: route.params.id })

async function loadPrevNfts() {
  await fetchNftsResults({ queryParameters: nftsResults.value.prev.substring(3) })
}

async function loadNextNfts() {
  await fetchNftsResults({ queryParameters: nftsResults.value.next.substring(3) })
}
</script>
