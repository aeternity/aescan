<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      selectedTime {{ selectedTime }}

      <transactions-select
        v-model="selectedTxType"
        size="sm"
        class="select u-hidden-mobile"/>

      <chart-controls
        v-model="selectedTime"
        class="u-hidden-mobile"
        :preselected-interval-index="intervalOptions[4]"/>
      <!--      //todo preselect-->
    </template>

    <div class="transactions-chart-panel__container">
      <line-chart
        :statistics="transactionsStatistics"
        :selected-interval="selectedTime.interval"/>
    </div>

    <chart-controls
      v-model="selectedTime"
      class="transactions-chart-panel__controls u-hidden-desktop"
      :preselected-interval-index="intervalOptions[4]"/>
    <transactions-select
      v-model="selectedTxType"
      class="select u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'

const chartsStore = useChartsStore()
const { transactionsStatistics } = storeToRefs(chartsStore)
const { fetchTransactionsStatistics } = chartsStore

const selectedTime = ref('')
const selectedTxType = ref('')
// const selectedInterval = ref('month')

const intervalOptions = [
  { interval: 'day', limit: '7', label: '1W' },
  { interval: 'day', limit: '30', label: '1M' },
  { interval: 'day', limit: '90', label: '3M' },
  { interval: 'month', limit: '12', label: '1Y' },
  { interval: 'month', limit: '100', label: 'ALL' },
]
// todo add to constants

if (process.client) {
  await fetchTransactionsStatistics()

  watch([selectedTime, selectedTxType], async() => {
    // todo destruct
    console.log('selected changed', selectedTime.value)

    await fetchTransactionsStatistics(
      selectedTime.value.interval,
      selectedTime.value.limit,
      selectedTime.value.range,
      selectedTxType.value.typeQuery)
  })
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
