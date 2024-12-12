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
import { chartsHints } from '@/utils/hints/chartsHints'
import { useChartsStore } from '@/stores/charts'

const chartsStore = useChartsStore()
const { accountsStatistics } = storeToRefs(chartsStore)
const { fetchAccountsStatistics } = chartsStore

const selectedRange = ref(CHART_INTERVALS_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadHashrateStatistics()
  return true
})

if (process.client) {
  watch([selectedRange], async() => {
    await loadHashrateStatistics()
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
