<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <!--      //todo preselect-->
      <transactions-select
        v-model="selectedTxType"
        size="sm"
        class="select u-hidden-mobile"/>

      <!--      todo model-->
      <chart-controls
        class="u-hidden-mobile"
        :preselected-interval-index="4"
        @selected="loadTransactionsStatistics"/>
    </template>

    <div class="transactions-chart-panel__container">
      <line-chart
        :statistics="transactionsStatistics"
        :selected-interval="selectedInterval"/>
    </div>

    <chart-controls
      class="transactions-chart-panel__controls u-hidden-desktop"
      :preselected-interval-index="4"
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
const selectedInterval = ref('month')
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
    display: flex;
    align-items: center;
    justify-content: center;

    height: 250px;
    position: relative;
  }

  &__controls {
    margin-top: var(--space-4);
  }
}
</style>
