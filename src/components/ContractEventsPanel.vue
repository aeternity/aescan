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

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useContractDetailsStore } from '@/stores/contractDetails'
import ContractEventsTable from '@/components/ContractEventsTable'
import ContractEventsTableCondensed from '@/components/ContractEventsTableCondensed'
import PaginatedContent from '@/components/PaginatedContent'

const contractDetailsStore = useContractDetailsStore()
const { fetchContractEvents } = contractDetailsStore
const { contractEvents } = storeToRefs(contractDetailsStore)

function loadPrevEvents() {
  fetchContractEvents({ queryParameters: contractEvents.value.prev })
}

function loadNextEvents() {
  fetchContractEvents({ queryParameters: contractEvents.value.next })
}
</script>

<style scoped>
.contract-events-panel {
  margin-top: var(--space-2);
  /*//todo move*/

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
