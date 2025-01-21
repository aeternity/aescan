<template>
  <app-panel class="names-active-panel">
    <paginated-content
      :entities="activeNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-active-table
        v-if="activeNames"
        class="names-active-panel__names-active-table u-hidden-mobile"
        :names="activeNames"/>

      <names-active-table-condensed
        v-if="activeNames"
        class="u-hidden-desktop"
        :names="activeNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
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
.names-active-panel__names-active-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
