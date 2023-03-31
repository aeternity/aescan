<template>
  <app-panel class="contract-events-panel">
    <paginated-content
      :entities="contractEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <contract-events-table
        v-if="contractEvents"
        :contract-events="contractEvents"
        class="contract-events-panel__table"/>

      <contract-events-table-condensed
        v-if="contractEvents"
        :contract-events="contractEvents"
        class="contract-events-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useContractDetailsStore } from '@/stores/contractDetails'
import ContractEventsTable from '@/components/ContractEventsTable'
import ContractEventsTableCondensed from '@/components/ContractEventsTableCondensed'
import PaginatedContent from '@/components/PaginatedContent'

export default {
  name: 'ContractEventsPanel',
  components: { PaginatedContent, ContractEventsTableCondensed, ContractEventsTable, AppPanel },
  computed: {
    ...mapState(useContractDetailsStore, ['contractEvents']),
  },
  methods: {
    ...mapActions(useContractDetailsStore, ['fetchContractEvents']),
    loadPrevEvents() {
      this.fetchContractEvents({ queryParameters: this.contractEvents.prev })
    },
    loadNextEvents() {
      this.fetchContractEvents({ queryParameters: this.contractEvents.next })
    },
  },
}
</script>

<style scoped>
.contract-events-panel {
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
