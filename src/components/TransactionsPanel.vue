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
        <div class="transactions-panel__header">
          <transactions-select
            v-model="selectedTxType"
            class="transactions-panel__select"/>

          <transactions-scope-picker
            v-model="selectedScope"
            class="u-hidden-mobile"/>
          <!--          todo how to cancel scope-->
          <!--          todo mobile-->
        </div>
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
import { CHART_INTERVALS_OPTIONS, TX_TYPES_OPTIONS } from '@/utils/constants'

const transactionsStore = useTransactionsStore()

const {
  transactions,
  transactionsCount,
  isHydrated,
  pageIndex,
  selectedTxType,
  selectedScope,
} = storeToRefs(useTransactionsStore())
const {
  loadTransactions,
  changeRoute,
  setLimit,
} = useTransactionsStore()
const route = useRoute()

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

if (process.client) {
  if (!isHydrated?.value) {
    setLimit(limit)
    await loadTransactions()
  }

  watch([selectedTxType, selectedScope], () => {
    changeRoute()
  })

  watch(() => route.fullPath, async() => {
    await loadTransactions()
  })
}

async function loadPrevTransactions() {
  await loadTransactions(transactions.value.prev)
}

async function loadNextTransactions() {
  await loadTransactions(transactions.value.next)
}

</script>

<style>
.transactions-panel {
  &__select {
    margin-right: var(--space-1);
  }

  &__header {
    display: flex;
  }
}
</style>
