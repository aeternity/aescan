<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <transactions-select
        v-if="hasSelect"
        v-model="selectedTxType"
        size="sm"
        class="transactions-chart-panel__select
        transactions-chart-panel__select--desktop
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
      class="transactions-chart-panel__controls u-hidden-desktop"/>

    <transactions-select
      v-if="hasSelect"
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

const props = defineProps({
  hasSelect: {
    required: true,
    type: Boolean,
  },
  range: {
    required: true,
    type: Object,
  },
})

const selectedRange = ref(props.range)
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
    props.hasSelect ? selectedTxType.value.typeQuery : null)
}
</script>

<style scoped>
.transactions-chart-panel {
  &__controls {
    margin-top: var(--space-4);
    margin-bottom: var(--space-2);

    &--desktop {
      margin-bottom: 0;
    }
  }

  &__select {
    width: 230px;
  }
}
</style>
