<template>
  <app-panel>
    <paginated-content
      :entities="tokensFound"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevTokensFound"
      @next-clicked="loadNextTokensFound">
      <search-results-tokens-table :tokens-found="tokensFound"/>
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
