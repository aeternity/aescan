<template>
  <app-panel>
    <paginated-content
      :entities="tokensResults"
      :limit="limit"
      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <search-tokens-table :tokens="tokensResults"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const searchStore = useSearchStore()
const { tokensResults } = storeToRefs(searchStore)
const { fetchTokenResults } = searchStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const route = useRoute()

await fetchTokenResults({ query: route.params.id, limit: limit.value })

async function loadPrevTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.prev })
}

async function loadNextTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.next })
}
</script>
