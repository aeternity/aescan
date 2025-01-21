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
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="accountsStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="accounts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>

import { chartsHints } from '@/utils/hints/chartsHints'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { accountsStatistics } = storeToRefs(chartsStore)
const { fetchAccountsStatistics } = chartsStore

const props = defineProps({
  preselectedRange: {
    type: Object,
    default: CHART_INTERVALS_PRESETS_OPTIONS[4],
  },
})

const range = ref(props.preselectedRange)

await useAsyncData(async() => {
  await loadHashrateStatistics()
  return true
})

if (process.client) {
  watch([range], async() => {
    await loadHashrateStatistics()
  })
}

async function loadHashrateStatistics() {
  await fetchAccountsStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval)
}
</script>

<style scoped>
.accounts-chart-pane__controls {
  margin-top: var(--space-4);
}
</style>
