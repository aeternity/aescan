<template>
  <app-panel>
    <paginated-content
      :entities="namesFound"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevNamesFound"
      @next-clicked="loadNextNamesFound">
      <search-results-names-table :names-found="namesFound"/>
      <!--      todo rename props-->
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from '#app'
import { storeToRefs } from 'pinia'
import { isDesktop } from '~/utils/screen'
import { useSearchStore } from '~/stores/search'
import SearchResultsNamesTable from '~/pages/search/SearchResultsNamesTable'

const searchStore = useSearchStore()
const { namesFound } = storeToRefs(searchStore)
const { fetchNamesSearch } = searchStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const route = useRoute()

await fetchNamesSearch({ query: route.params.id, limit: limit.value })

async function loadPrevNamesFound() {
  await fetchNamesSearch({ queryParameters: namesFound.value.prev })
}

async function loadNextNamesFound() {
  await fetchNamesSearch({ queryParameters: namesFound.value.next })
}
</script>
