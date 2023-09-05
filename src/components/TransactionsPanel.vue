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
      <transactions-table-condensed
        :transactions="transactions"
        class="transactions-panel__table-condensed"/>
      <transactions-table
        :transactions="transactions"
        class="transactions-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'nuxt/app'
import TransactionsTable from '@/components/TransactionsTable'
import TransactionsTableCondensed from '@/components/TransactionsTableCondensed'
import AppPanel from '@/components/AppPanel'
import TransactionsSelect from '@/components/TransactionsSelect'
import { useTransactionsStore } from '@/stores/transactions'
import { TX_TYPES_OPTIONS } from '@/utils/constants'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

const transactionsStore = useTransactionsStore()
const {
  transactions,
  transactionsCount,
} = storeToRefs(transactionsStore)
const { fetchTransactions, fetchTransactionsCount } = transactionsStore
const route = useRoute()
const { push } = useRouter()

const selectedTxType = ref(TX_TYPES_OPTIONS[0])
const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

async function loadPrevTransactions() {
  await fetchTransactions(transactions.value.prev)
}

async function loadNextTransactions() {
  await fetchTransactions(transactions.value.next)
}

const loadTransactions = () => {
  const { txType } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
  selectedTxType.value = txTypeOption || TX_TYPES_OPTIONS[0]
  fetchTransactions(`/v2/txs?limit=${limit.value}${txType ? '&type=' + txType : ''}`)
  fetchTransactionsCount(txType)
  pageIndex.value = 1
}

if (process.client) {
  watch(route, (newRoute, prevRoute) => {
    if (newRoute.name !== prevRoute.name) {
      return
    }
    loadTransactions()
  })
  watch(selectedTxType, () => {
    const typeQuery = selectedTxType.value?.typeQuery
    const slug = `${typeQuery ? '?txType=' + typeQuery : ''}`
    push(`/transactions${slug}`)
  })

  loadTransactions()
}
</script>

<style scoped>
.transactions-panel {
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
