<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <transactions-select
        v-model="selectedTxType"
        size="sm"
        class="charts-transactions-chart-panel__select
        charts-transactions-chart-panel__select--desktop
        u-hidden-mobile"/>

      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="transactionsStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
      class="charts-transactions-chart-panel__controls u-hidden-desktop"/>
    <transactions-select
      v-model="selectedTxType"
      class="select u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { transactionsStatistics } = storeToRefs(chartsStore)
const { fetchTransactionsStatistics } = chartsStore

const selectedRange = ref(CHART_INTERVALS_OPTIONS[4])
const selectedTxType = ref(TX_TYPES_OPTIONS[0])

await useAsyncData(async() => {
  await loadTransactionStatistics()
  return true
})

watch([selectedRange, selectedTxType], async() => {
  await loadTransactionStatistics()
})

async function loadTransactionStatistics() {
  await fetchTransactionsStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval,
    selectedTxType.value.typeQuery)
}
</script>

<style scoped>
.charts-transactions-chart-panel {
  &__controls {
    margin-top: var(--space-4);
    margin-bottom: var(--space-2);

    &--desktop {
      margin-bottom: 0;
    }
  }

  &__select {
    width: 210px;
  }
}
</style>
