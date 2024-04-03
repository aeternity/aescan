<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <chart-controls
        v-model="selectedTime"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :statistics="transactionsStatistics"
      :selected-interval="selectedTime.interval"/>

    <chart-controls
      v-model="selectedTime"
      class="transactions-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { useTransactionsStore } from '@/stores/transactions'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'
// TODO FIX IMPORTS
const transactionsStore = useTransactionsStore()
const { transactionsStatistics } = storeToRefs(transactionsStore)
const { fetchTransactionsStatistics } = transactionsStore

const selectedTime = ref(CHART_INTERVALS_OPTIONS[0])

if (process.client) {
  await loadTransactionStatistics()
  watch(selectedTime, async() => {
    await loadTransactionStatistics()
  })
}

async function loadTransactionStatistics() {
  await fetchTransactionsStatistics(
    selectedTime.value.interval,
    selectedTime.value.limit,
    selectedTime.value.range)
}
</script>

<style scoped>
.transactions-chart-panel {
  &__controls {
    margin-top: var(--space-4);
  }
}
</style>
