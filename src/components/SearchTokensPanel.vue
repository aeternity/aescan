<template>
  <app-panel>
    <paginated-content
      :entities="tokensResults"
      :limit="limit"
      @prev-clicked="loadPrevTokens"
      @next-clicked="loadNextTokens">
      <search-tokens-table
        :tokens="tokensResults"
        class="u-hidden-mobile"/>
      <search-tokens-table-condensed
        :tokens="tokensResults"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { isDesktop } from '@/utils/screen'
import { useSearchStore } from '@/stores/search'

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
