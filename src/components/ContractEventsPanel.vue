<template>
  <app-panel class="contract-events-panel">
    <paginated-content
      :entities="contractEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <contract-events-table
        v-if="contractEvents"
        :contract-details="contractDetails"
        :contract-events="contractEvents"
        class="u-hidden-mobile"/>

      <contract-events-table-condensed
        v-if="contractEvents"
        :contract-details="contractDetails"
        :contract-events="contractEvents"
        class="u-hidden-desktop"/>
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
const { contractEvents, contractDetails } = storeToRefs(contractDetailsStore)

function loadPrevEvents() {
  fetchContractEvents({ queryParameters: contractEvents.value.prev })
}

function loadNextEvents() {
  fetchContractEvents({ queryParameters: contractEvents.value.next })
}
</script>
