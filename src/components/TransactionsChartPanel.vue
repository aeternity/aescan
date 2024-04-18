<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="transactionsStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
      class="transactions-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { useTransactionsStore } from '@/stores/transactions'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'

const transactionsStore = useTransactionsStore()
const { transactionsStatistics } = storeToRefs(transactionsStore)
const { fetchTransactionsStatistics } = transactionsStore

const selectedRange = ref(CHART_INTERVALS_OPTIONS[0])

await useAsyncData(async() => {
  await loadTransactionStatistics()
  return true
})

watch(selectedRange, async() => {
  await loadTransactionStatistics()
})

async function loadTransactionStatistics() {
  await fetchTransactionsStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
}
</script>

<style scoped>
.transactions-chart-panel {
  &__controls {
    margin-top: var(--space-4);
  }
}
</style>
