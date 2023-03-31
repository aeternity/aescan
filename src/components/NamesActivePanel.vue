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

<script>
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import NamesActiveTable from '@/components/NamesActiveTable'
import NamesActiveTableCondensed from '@/components/NamesActiveTableCondensed'
import { useNamesStore } from '@/stores/names'

export default {
  name: 'NamesActivePanel',
  components: {
    NamesActiveTable,
    NamesActiveTableCondensed,
    AppPanel,
    PaginatedContent,
  },
  computed: {
    ...mapState(useNamesStore, ['activeNames']),
  },
  methods: {
    ...mapActions(useNamesStore, ['fetchActiveNames']),
    loadPrevNames() {
      this.fetchActiveNames({ queryParameters: this.activeNames.prev })
    },
    loadNextNames() {
      this.fetchActiveNames({ queryParameters: this.activeNames.next })
    },
  },
}
</script>

<style scoped>
.names-active-panel {
  background: var(--color-white);
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__names-active-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__names-active-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
