<template>
  <app-panel class="names-expired-panel">
    <paginated-content
      :entities="expiredNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-expired-table
        v-if="expiredNames"
        class="names-expired-panel__names-expired-table u-hidden-mobile"
        :names="expiredNames"/>

      <names-expired-table-condensed
        v-if="expiredNames"
        class="names-expired-panel__names-expired-table-condensed u-hidden-desktop"
        :names="expiredNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import NamesExpiredTable from '@/components/NamesExpiredTable'
import NamesExpiredTableCondensed from '@/components/NamesExpiredTableCondensed'
import { useNamesStore } from '@/stores/names'

const namesStore = useNamesStore()
const { fetchExpiredNames } = namesStore
const { expiredNames } = storeToRefs(namesStore)

function loadPrevNames() {
  fetchExpiredNames({ queryParameters: expiredNames.value.prev })
}

function loadNextNames() {
  fetchExpiredNames({ queryParameters: expiredNames.value.next })
}
</script>

<style scoped>
.names-expired-panel__names-expired-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
