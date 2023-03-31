<template>
  <app-panel class="names-expired-panel">
    <paginated-content
      :entities="expiredNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-expired-table
        v-if="expiredNames"
        class="names-expired-panel__names-expired-table"
        :names="expiredNames"/>

      <names-expired-table-condensed
        v-if="expiredNames"
        class="names-expired-panel__names-expired-table-condensed"
        :names="expiredNames"/>
    </paginated-content>
  </app-panel>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import NamesExpiredTable from '@/components/NamesExpiredTable'
import NamesExpiredTableCondensed from '@/components/NamesExpiredTableCondensed'
import { useNamesStore } from '@/stores/names'

export default {
  name: 'NamesExpiredPanel',
  components: {
    NamesExpiredTable,
    NamesExpiredTableCondensed,
    AppPanel,
    PaginatedContent,
  },
  computed: {
    ...mapState(useNamesStore, ['expiredNames']),
  },
  methods: {
    ...mapActions(useNamesStore, ['fetchExpiredNames']),
    loadPrevNames() {
      this.fetchExpiredNames({ queryParameters: this.expiredNames.prev })
    },
    loadNextNames() {
      this.fetchExpiredNames({ queryParameters: this.expiredNames.next })
    },
  },
}
</script>

<style scoped>
.names-expired-panel {
  background: var(--color-white);
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__names-expired-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__names-expired-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
