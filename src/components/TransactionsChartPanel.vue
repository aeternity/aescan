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
      class="transactions-chart-panel__controls u-hidden-desktop"
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

const selectedInterval = ref('day')

if (process.client) {
  await fetchTransactionsStatistics()
}

async function loadTransactionsStatistics({ interval, limit, range }) {
  selectedInterval.value = interval
  await fetchTransactionsStatistics(interval, limit, range)
}
</script>

<style scoped>
.transactions-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__controls {
    margin-top: var(--space-4);
  }
}
</style>
