<template>
  <app-panel>
    <paginated-content
      :entities="tokensFound"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevTokensFound"
      @next-clicked="loadNextTokensFound">
      <search-tokens-table
        :tokens-found="tokensFound"
        class="search-tokens-panel__search-tokens-table"/>
      <search-tokens-table-condensed
        :tokens-found="tokensFound"
        class="search-tokens-panel__search-tokens-table-condensed"/>
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
.search-tokens-panel {
  &__search-tokens-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__search-tokens-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
