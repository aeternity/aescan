<template>
  <app-panel>
    <paginated-content
      :entities="tokensFound"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevTokensFound"
      @next-clicked="loadNextTokensFound">
      <search-results-tokens-table
        :tokens-found="tokensFound"
        class="search-results-tokens-panel__search-results-tokens-table"/>
      <search-results-tokens-table-condensed
        :tokens-found="tokensFound"
        class="search-results-tokens-panel__search-results-tokens-table-condensed"/>
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
import SearchResultsTokensTable from '~/pages/search/SearchResultsTokensTable'
import SearchResultsTokensTableCondensed from '~/pages/search/SearchResultsTokensTableCondensed'

const searchStore = useSearchStore()
const { tokensFound } = storeToRefs(searchStore)
const { fetchTokenSearch } = searchStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const route = useRoute()

await fetchTokenSearch({ query: route.params.id, limit: limit.value })

async function loadPrevTokensFound() {
  await fetchTokenSearch({ queryParameters: tokensFound.value.prev })
}

async function loadNextTokensFound() {
  await fetchTokenSearch({ queryParameters: tokensFound.value.next })
}
</script>

<style scoped>
.search-results-tokens-panel {
  &__search-results-tokens-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__search-results-tokens-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
