<template>
  <app-panel class="contract-call-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :total-count="contractCallsCount"
      :limit="limit"
      :entities="contractCallTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <contract-call-transactions-table
        class="u-hidden-mobile"
        :contract-call-transactions="contractCallTransactions"/>

      <contract-call-transactions-table-condensed
        class="u-hidden-desktop"
        :contract-call-transactions="contractCallTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useContractDetailsStore } from '@/stores/contractDetails'
import ContractCallTransactionsTable from '@/components/ContractCallTransactionsTable'
import ContractCallTransactionsTableCondensed from '@/components/ContractCallTransactionsTableCondensed'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'

const contractDetailsStore = useContractDetailsStore()
const { contractCallTransactions, contractCallsCount } = storeToRefs(contractDetailsStore)
const { fetchContractCallTransactions } = contractDetailsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const loadPrevTransactions = () => {
  fetchContractCallTransactions({
    queryParameters: contractCallTransactions.value.prev,
  })
}
const loadNextTransactions = () => {
  fetchContractCallTransactions({
    queryParameters: contractCallTransactions.value.next,
  })
}

if (process.client) {
  fetchContractCallTransactions({
    limit: limit.value,
  })
}
</script>
