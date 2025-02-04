<template>
  <app-panel>
    <paginated-content
      :entities="nftsResults"
      :limit="limit"
      @prev-clicked="loadPrevNfts"
      @next-clicked="loadNextNfts">
      <search-nfts-table
        :nfts="nftsResults"
        class="u-hidden-mobile"/>
      <search-nfts-table-condensed
        :nfts="nftsResults"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>

const searchStore = useSearchStore()
const { nftsResults } = storeToRefs(searchStore)
const { fetchNftsResults } = searchStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const route = useRoute()

await fetchNftsResults({ query: route.params.id, limit: limit.value })

async function loadPrevNfts() {
  await fetchNftsResults({ queryParameters: nftsResults.value.prev })
}

async function loadNextNfts() {
  await fetchNftsResults({ queryParameters: nftsResults.value.next })
}
</script>
