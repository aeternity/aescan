<template>
  <app-panel>
    <paginated-content
      :entities="namesFound"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevNamesFound"
      @next-clicked="loadNextNamesFound">
      <search-names-table
        :names-found="namesFound"
        class="search-names-panel__search-names-table"/>
      <search-names-table-condensed
        :names-found="namesFound"
        class="search-names-panel__search-names-table-condensed"/>
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
.search-names-panel {
  &__search-names-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__search-names-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
