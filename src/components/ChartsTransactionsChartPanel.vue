<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <!--      selectedTime {{ selectedTime }}-->
      <transactions-select
        v-model="selectedTxType"
        size="sm"
        class="charts-transactions-chart-panel__select u-hidden-mobile"/>

      <chart-controls
        v-model="selectedTime"
        class="u-hidden-mobile"/>
    </template>

    <div class="charts-transactions-chart-panel__container">
      <line-chart
        :statistics="transactionsStatistics"
        :selected-interval="selectedTime.interval"/>
    </div>

    <chart-controls
      v-model="selectedTime"
      class="charts-transactions-chart-panel__controls u-hidden-desktop"/>
    <transactions-select
      v-model="selectedTxType"
      class="select u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import { CHART_INTERVALS_OPTIONS } from '~/utils/constants'

const chartsStore = useChartsStore()
const { transactionsStatistics } = storeToRefs(chartsStore)
const { fetchTransactionsStatistics } = chartsStore

const selectedTime = ref(CHART_INTERVALS_OPTIONS[4])
const selectedTxType = ref(TX_TYPES_OPTIONS[0])

if (process.client) {
  await loadTransactionStatistics()
  // todo expand concept
  watch([selectedTime, selectedTxType], async() => {
    console.log('selected changed', selectedTime.value)
    await loadTransactionStatistics()
  })
}

async function loadTransactionStatistics() {
  await fetchTransactionsStatistics(
    selectedTime.value.interval,
    selectedTime.value.limit,
    selectedTime.value.range,
    selectedTxType.value.typeQuery)
}
</script>

<style scoped>
/*todo rename component*/
.charts-transactions-chart-panel {
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

  &__select {
    width: 210px;
  }
}
</style>
