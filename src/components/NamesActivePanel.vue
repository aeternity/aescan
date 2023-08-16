<template>
  <app-panel class="names-active-panel">
    <paginated-content
      :entities="activeNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-active-table
        v-if="activeNames"
        class="names-active-panel__names-active-table"
        :names="activeNames"/>

      <names-active-table-condensed
        v-if="activeNames"
        class="names-active-panel__names-active-table-condensed"
        :names="activeNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import NamesActiveTable from '@/components/NamesActiveTable'
import NamesActiveTableCondensed from '@/components/NamesActiveTableCondensed'
import { useNamesStore } from '@/stores/names'

const namesStore = useNamesStore()
const { fetchActiveNames } = namesStore
const { activeNames } = storeToRefs(namesStore)

function loadPrevNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.prev })
}

function loadNextNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.next })
}
</script>

<style scoped>
.names-active-panel {
  &__names-active-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-4);
    }
  }

  &__names-active-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
