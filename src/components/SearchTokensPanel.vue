<template>
  <app-panel>
    <paginated-content
      :entities="tokensResults"

      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <search-tokens-table :tokens="tokensResults"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { tokensResults } = storeToRefs(useSearchStore())
const { fetchTokenResults } = useSearchStore()

const route = useRoute()

await fetchTokenResults({ query: route.params.id, limit: 10 })

async function loadPrevTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.prev })
}

async function loadNextTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.next })
}
</script>
