<template>
  <app-panel>
    <template #title>
      TRANSACTIONS
    </template>
    <template #end>
      <transactions-select
        v-if="hasSelect"
        v-model="type"
        size="sm"
        class="transactions-chart-panel__select
        transactions-chart-panel__select--desktop
        u-hidden-mobile"/>

      <chart-controls
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="transactionsStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="transactions-chart-panel__controls u-hidden-desktop"/>

    <transactions-select
      v-if="hasSelect"
      v-model="type"
      class="select u-hidden-desktop transactions-chart-panel__select"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '~/utils/constants'

const chartsStore = useChartsStore()
const { transactionsStatistics } = storeToRefs(chartsStore)
const { fetchTransactionsStatistics } = chartsStore

const props = defineProps({
  hasSelect: {
    required: true,
    type: Boolean,
  },
  preselectedRange: {
    type: Object,
    default: CHART_INTERVALS_PRESETS_OPTIONS[4],
  },
})

const range = ref(props.preselectedRange)
const type = ref(TX_TYPES_OPTIONS[0])

await useAsyncData(async() => {
  await loadTransactionStatistics()
  return true
})

if (process.client) {
  watch([range, type], async() => {
    await loadTransactionStatistics()
  })
}

async function loadTransactionStatistics() {
  await fetchTransactionsStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval,
    props.hasSelect ? type.value.typeQuery : null)
}
</script>

<style scoped>
.transactions-chart-panel {
  &__controls {
    margin-top: var(--space-4);

    &--desktop {
      margin-bottom: 0;
    }
  }

  &__select {
    margin-top: var(--space-2);

    @media (--desktop) {
      margin-top: 0;
    }

  }
}
</style>
