<template>
  <app-panel class="contracts-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="contracts"
      :total-count="contractsCount"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevContracts"
      @next-clicked="loadNextContracts">
      <contract-table-condensed
        :contracts="contracts"
        class="contracts-panel__table-condensed"/>
      <contracts-table
        :contracts="contracts"
        class="contracts-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import AppPanel from '@/components/AppPanel'
import { useContractsStore } from '@/stores/contracts'
import PaginatedContent from '@/components/PaginatedContent'
import ContractsTable from '@/components/ContractsTable'
import ContractTableCondensed from '@/components/ContractsTableCondensed'
import { isDesktop } from '@/utils/screen'

const contractsStore = useContractsStore()
const { contracts, contractsCount } = storeToRefs(contractsStore)
const { fetchContracts, fetchContractsCount } = contractsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const loadPrevContracts = () => {
  fetchContracts(contracts.value.prev)
}
const loadNextContracts = () => {
  fetchContracts(contracts.value.next)
}

const loadContracts = () => {
  fetchContracts(`/v2/txs?type=contract_create&limit=${limit.value}`)
  fetchContractsCount()
  pageIndex.value = 1
}

if (process.client) {
  loadContracts()
}

</script>

<style scoped>
.contracts-panel {
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
