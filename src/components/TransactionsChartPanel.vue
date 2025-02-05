<template>
  <app-panel>
    <template #title>
      TRANSACTIONS
    </template>
    <template #end>
      <transactions-select
        v-if="hasSelect"
        v-model="selectedTxType"
        size="sm"
        class="transactions-chart-panel__select
        transactions-chart-panel__select--desktop
        u-hidden-mobile"/>

      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="transactionsStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="transactions-chart-panel__controls u-hidden-desktop"/>

    <transactions-select
      v-if="hasSelect"
      v-model="selectedTxType"
      class="select u-hidden-desktop transactions-chart-panel__select"/>
  </app-panel>
</template>

<script setup>
import { CHART_SCOPE_PRESETS_OPTIONS } from '@/utils/constants'

const { transactionsStatistics } = storeToRefs(useChartsStore())
const { fetchTransactionsStatistics } = useChartsStore()

const props = defineProps({
  hasSelect: {
    default: true,
    type: Boolean,
  },
  scope: {
    required: true,
    type: Object,
    default: CHART_SCOPE_PRESETS_OPTIONS[4],
  },
})

const selectedScope = ref(props.scope)
const selectedTxType = ref(TX_TYPES_OPTIONS[0])
await useAsyncData(async() => {
  await loadTransactionStatistics()
  return true
})

if (process.client) {
  watch([selectedScope, selectedTxType], async() => {
    await loadTransactionStatistics()
  })
}

async function loadTransactionStatistics() {
  await fetchTransactionsStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope,
    selectedTxType.value?.typeQuery)
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
