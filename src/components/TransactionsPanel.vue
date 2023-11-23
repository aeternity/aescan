<template>
  <app-panel class="transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      pagination-style="history"
      :entities="transactions"
      :total-count="transactionsCount"
      :limit="limit"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>
      <transactions-table
        :transactions="transactions"
        class="u-hidden-mobile"/>
      <transactions-table-condensed
        :transactions="transactions"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'nuxt/app'
import { useTransactionsStore } from '@/stores/transactions'
import { TX_TYPES_OPTIONS } from '@/utils/constants'
import { isDesktop } from '@/utils/screen'

const transactionsStore = useTransactionsStore()
const { transactions, transactionsCount, isHydrated, pageIndex, selectedTxType } = storeToRefs(transactionsStore)
const { fetchTransactions, fetchTransactionsCount, setPageIndex, setSelectedTxType } = transactionsStore
const route = useRoute()
const { push } = useRouter()

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadPrevTransactions() {
  await fetchTransactions(transactions.value.prev)
}

async function loadNextTransactions() {
  await fetchTransactions(transactions.value.next)
}

async function loadTransactions() {
  const { txType } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
  setSelectedTxType(txTypeOption || TX_TYPES_OPTIONS[0])
  await fetchTransactions(`/v3/transactions?limit=${limit.value}${selectedTxType.value.typeQuery ? '&type=' + selectedTxType.value.typeQuery : ''}`)
  await fetchTransactionsCount(selectedTxType.value.typeQuery)
  setPageIndex(1)
}

if (process.client) {
  watch(() => route.fullPath, () => {
    loadTransactions()
  })
  watch(selectedTxType, () => {
    const typeQuery = selectedTxType.value?.typeQuery
    const slug = `${typeQuery ? '?txType=' + typeQuery : ''}`
    push(`/transactions${slug}`)
  })

  if (!isHydrated.value) {
    loadTransactions()
  }
}
</script>
