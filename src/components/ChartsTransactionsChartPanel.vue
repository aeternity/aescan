<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <transactions-select
        v-model="selectedTxType"
        class="select u-hidden-mobile"/>

      <chart-controls
        class="u-hidden-mobile"
        @selected="loadTransactionsStatistics"/>
    </template>

    <div class="transactions-chart-panel__container">
      <line-chart
        v-if="transactionsStatistics && transactionsStatistics.length > 0"
        :statistics="transactionsStatistics"
        :selected-interval="selectedInterval"/>
      <blank-state v-if="transactionsStatistics && transactionsStatistics.length === 0"/>
      <loader-indicator v-if="transactionsStatistics=== null"/>
      <!--      //todo blank everywhere-->
    </div>

    <chart-controls
      class="transactions-chart-panel__controls u-hidden-desktop"
      @selected="loadTransactionsStatistics"/>
    <transactions-select
      v-model="selectedTxType"
      class="select u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import LineChart from '@/components/LineChart'

const chartsStore = useChartsStore()
const { transactionsStatistics } = storeToRefs(chartsStore)
const { fetchTransactionsStatistics } = chartsStore

const selectedTxType = ref('')
const selectedInterval = ref('')
const selectedLimit = ref('')
const selectedRange = ref('')

if (process.client) {
  await fetchTransactionsStatistics()

  watch(selectedTxType, async() => {
    await fetchTransactionsStatistics(
      selectedInterval.value,
      selectedLimit.value,
      selectedRange.value,
      selectedTxType.value.typeQuery)
  })
}

async function loadTransactionsStatistics({ interval, limit, range }) {
  selectedInterval.value = interval
  selectedLimit.value = limit
  selectedRange.value = range
  await fetchTransactionsStatistics(
    selectedInterval.value,
    selectedLimit.value,
    selectedRange.value,
    selectedTxType.value.typeQuery)
}
</script>

<style scoped>
.select {
  width: 210px;
}

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
