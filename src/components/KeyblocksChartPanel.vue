<template>
  <app-panel>
    <template #title>
      KEYBLOCKS MINED
    </template>
    <template #end>
      <chart-controls
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="keyblocksStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="keyblocks-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>

import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { keyblocksStatistics } = storeToRefs(chartsStore)
const { fetchKeyblocksStatistics } = chartsStore

const range = ref(CHART_INTERVALS_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadKeyblockStatistics()
  return true
})

if (process.client) {
  watch(range, async() => {
    await loadKeyblockStatistics()
  })
}

async function loadKeyblockStatistics() {
  await fetchKeyblocksStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval)
}
</script>

<style scoped>
.keyblocks-chart-pane__controls {
  margin-top: var(--space-4);
}
</style>
