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

          <transactions-range-picker
            v-model="selectedRange"
            class="u-hidden-mobile"/>
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

const {
  transactions,
  transactionsCount,
  isHydrated,
  pageIndex,
  selectedTxType,
  selectedRange,
} = storeToRefs(useTransactionsStore())
const {
  loadTransactions,
  changeRoute,
} = useTransactionsStore()
const route = useRoute()

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

// todo differrent default value

if (process.client) {
  if (!isHydrated?.value) {
    await loadTransactions()
  }

  watch([selectedTxType, selectedRange], () => {
    // console.log('selectedRange or selectedTxType changed to', selectedRange.value, selectedTxType.value)
    changeRoute()
  })

  watch(() => route.fullPath, async() => {
    console.log('watch path changed to', route.fullPath)
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
