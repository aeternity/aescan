<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
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

const pageLimit = usePageLimit('search-tokens')

watch(pageLimit, () => {
  fetchTokenResults({ query: route.params.id, limit: pageLimit.value })
})

fetchTokenResults({ query: route.params.id })

async function loadPrevTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.prev.substring(3) })
}

async function loadNextTokens() {
  await fetchTokenResults({ queryParameters: tokensResults.value.next.substring(3) })
}
</script>
