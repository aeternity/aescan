<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
      :entities="namesResults"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <search-names-table :names="namesResults"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { namesResults } = storeToRefs(useSearchStore())
const { fetchNamesResults } = useSearchStore()

const route = useRoute()

const pageLimit = usePageLimit('search-names')

watch(pageLimit, () => {
  fetchNamesResults({ query: route.params.id, limit: pageLimit.value })
})

fetchNamesResults({ query: route.params.id })

async function loadPrevNames() {
  await fetchNamesResults({ queryParameters: namesResults.value.prev.substring(3) })
}

async function loadNextNames() {
  await fetchNamesResults({ queryParameters: namesResults.value.next.substring(3) })
}
</script>
