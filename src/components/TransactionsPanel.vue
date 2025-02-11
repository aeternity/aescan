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
            size="sm"
            class="transactions-panel__select"/>
          <transactions-scope-picker v-model="selectedScope"/>
        </div>
      </template>
      <transactions-table :transactions="transactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
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
  setPageLimit,
} = useTransactionsStore()
const route = useRoute()

// todo remove limit
const limit = computed(() => 10)

if (process.client) {
  if (!isHydrated?.value) {
    setPageLimit(limit)
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

    @media (--desktop) {
      flex-direction: row;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;

    @media (--desktop) {
      flex-direction: row;
    }
  }
}
</style>
