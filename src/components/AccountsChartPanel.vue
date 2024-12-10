<template>
  <app-panel>
    <template #title>
      ACTIVE ACCOUNTS
      <hint-tooltip>
        {{ chartsHints.accountsChart }}
      </hint-tooltip>
    </template>
    <template #end>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="accountsStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
      class="accounts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { chartsHints } from '../utils/hints/chartsHints'
import { useChartsStore } from '@/stores/charts'

const chartsStore = useChartsStore()
const { accountsStatistics } = storeToRefs(chartsStore)
const { fetchAccountsStatistics } = chartsStore

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
  await loadHashratetatistics()
  return true
})

if (process.client) {
  watch([selectedRange, selectedTxType], async() => {
    await loadHashratetatistics()
  })
}

async function loadHashratetatistics() {
  await fetchAccountsStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
}
</script>

<style scoped>
.accounts-chart-pane__controls {
  margin-top: var(--space-4);
}
</style>
