<template>
  <app-panel>
    <template #title>
      HASHRATE
    </template>
    <template #end>
      <chart-controls
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="hashrateStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="hashrate-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'

const chartsStore = useChartsStore()
const { hashrateStatistics } = storeToRefs(chartsStore)
const { fetchHashrateStatistics } = chartsStore

const range = ref(CHART_INTERVALS_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadHashratetatistics()
  return true
})

if (process.client) {
  watch([range], async() => {
    await loadHashratetatistics()
  })
}

async function loadHashratetatistics() {
  await fetchHashrateStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval)
}
</script>

<style scoped>
.hashrate-chart-pane__controls {
  margin-top: var(--space-4);
}
</style>
