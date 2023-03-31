<template>
  <app-panel
    v-if="inAuctionNames"
    class="names-in-auction-panel">
    <paginated-content
      :entities="inAuctionNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-in-auction-table
        class="names-in-auction-panel__names-in-auction-table"
        :names="inAuctionNames"/>

      <names-in-auction-table-condensed
        class="names-in-auction-panel__names-in-auction-table-condensed"
        :names="inAuctionNames"/>
    </paginated-content>
  </app-panel>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import PaginatedContent from '@/components/PaginatedContent'
import NamesInAuctionTable from '@/components/NamesInAuctionTable'
import NamesInAuctionTableCondensed from '@/components/NamesInAuctionTableCondensed'
import { useNamesStore } from '@/stores/names'

export default {
  name: 'NamesInAuctionPanel',
  components: {
    NamesInAuctionTable,
    NamesInAuctionTableCondensed,
    AppPanel,
    PaginatedContent,
  },
  computed: {
    ...mapState(useNamesStore, ['inAuctionNames']),
  },
  methods: {
    ...mapActions(useNamesStore, ['fetchInAuctionNames']),
    loadPrevNames() {
      this.fetchInAuctionNames({ queryParameters: this.inAuctionNames.prev })
    },
    loadNextNames() {
      this.fetchInAuctionNames({ queryParameters: this.inAuctionNames.next })
    },
  },
}
</script>

<style scoped>
.names-in-auction-panel {
  background: var(--color-white);
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__names-in-auction-table {
    display: none;

    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__names-in-auction-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
