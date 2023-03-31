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

<script>
import { mapActions, mapState } from 'pinia'
import NameHistoryTable from '@/components/NameHistoryTable'
import NameHistoryTableCondensed from '@/components/NameHistoryTableCondensed'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import { useNameDetailsStore } from '@/stores/nameDetails'

export default {
  name: 'NameHistoryPanel',
  components: { AppPanel, PaginatedContent, NameHistoryTable, NameHistoryTableCondensed },
  computed: {
    ...mapState(useNameDetailsStore, ['nameActions']),
  },
  methods: {
    ...mapActions(useNameDetailsStore, ['fetchNameActions']),
    loadPrevActions() {
      this.fetchNameActions({ queryParameters: this.nameActions.prev })
    },
    loadNextActions() {
      this.fetchNameActions({ queryParameters: this.nameActions.next })
    },
  },
}
</script>

<style scoped>
.name-history-panel {
  background: var(--color-white);
  padding: var(--space-3) var(--space-1) var(--space-4);

  @media (--desktop) {
    background: var(--color-white);
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__name-history-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__name-history-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
