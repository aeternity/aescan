<template>
  <app-panel class="name-history-panel">
    <paginated-content
      :entities="nameActions"
      pagination-style="history"
      @prev-clicked="loadPrevActions"
      @next-clicked="loadNextActions">
      <name-history-table
        v-if="nameActions"
        class="name-history-panel__name-history-table"
        :actions="nameActions"/>

      <name-history-table-condensed
        v-if="nameActions"
        class="name-history-panel__name-history-table-condensed"
        :actions="nameActions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import NameHistoryTable from '@/components/NameHistoryTable'
import NameHistoryTableCondensed from '@/components/NameHistoryTableCondensed'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import { useNameDetailsStore } from '@/stores/nameDetails'

const nameDetailsStore = useNameDetailsStore()
const { fetchNameActions } = nameDetailsStore
const { nameActions } = storeToRefs(nameDetailsStore)

function loadPrevActions() {
  return fetchNameActions({ queryParameters: nameActions.value.prev })
}

function loadNextActions() {
  return fetchNameActions({ queryParameters: nameActions.value.next })
}
</script>

<style scoped>
.name-history-panel {
  &__name-history-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-4);
    }
  }

  &__name-history-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
