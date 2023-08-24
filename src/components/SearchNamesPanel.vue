<template>
  <app-panel>
    <paginated-content
      :entities="namesResults"
      :limit="limit"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <search-names-table
        :names="namesResults"
        class="search-names-panel__search-names-table"/>
      <search-names-table-condensed
        :names="namesResults"
        class="search-names-panel__search-names-table-condensed"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { isDesktop } from '@/utils/screen'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const { namesResults } = storeToRefs(searchStore)
const { fetchNamesResults } = searchStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const route = useRoute()

await fetchNamesResults({ query: route.params.id, limit: limit.value })

async function loadPrevNames() {
  await fetchNamesResults({ queryParameters: namesResults.value.prev })
}

async function loadNextNames() {
  await fetchNamesResults({ queryParameters: namesResults.value.next })
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
