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

fetchTokenResults({ query: route.params.id })

async function loadPrevTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.prev.substring(3) })
}

async function loadNextTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.next.substring(3) })
}
</script>
