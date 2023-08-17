<template>
  <app-panel>
    <paginated-content
      :entities="namesFound"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevNamesFound"
      @next-clicked="loadNextNamesFound">
      <search-results-names-table
        :names-found="namesFound"
        class="search-results-names-panel__search-results-names-table"/>
      <search-results-names-table-condensed
        :names-found="namesFound"
        class="search-results-names-panel__search-results-names-table-condensed"/>
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
import SearchResultsNamesTableCondensed from '~/pages/search/SearchResultsNamesTableCondensed'

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

<style scoped>
.search-results-names-panel {
  &__search-results-names-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__search-results-names-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
