<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <chart-controls
        class="u-hidden-mobile"
        @selected="loadTransactionsStatistics"/>
    </template>

    <div class="transactions-chart-panel__container">
      <line-chart
        v-if="transactionsStatistics"
        :statistics="transactionsStatistics"
        :selected-interval="selectedInterval"/>
    </div>

    <chart-controls
      class="transactions-chart-panel__chart-controls u-hidden-desktop"
      @selected="loadTransactionsStatistics"/>
  </app-panel>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '@/stores/transactions'
import LineChart from '@/components/LineChart'

const transactionsStore = useTransactionsStore()
const { transactionsStatistics } = storeToRefs(transactionsStore)
const { fetchTransactionsStatistics } = transactionsStore

const selectedInterval = ref('')

await useAsyncData(async() => {
  await fetchTransactionsStatistics()
  return true
})

async function loadTransactionsStatistics({ interval, limit, range }) {
  selectedInterval.value = interval
  const slug = range
    ? `?min_start_date=${range.minStart}&max_start_date=${range.maxStart}&limit=1000`
    : `?interval_by=${interval}&limit=${limit}`
  await fetchTransactionsStatistics(slug)
}
</script>

<style scoped>
.transactions-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__chart-controls {
    margin-top: var(--space-4);
  }
}
</style>
