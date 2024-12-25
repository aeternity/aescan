<template>
  <app-panel>
    <template #title>
      KEYBLOCKS MINED
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="keyblocksStatistics"
      :interval="selectedScope.interval"/>

    <chart-controls
      v-model="selectedScope"
      class="keyblocks-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const { keyblocksStatistics } = storeToRefs(useChartsStore())
const { fetchKeyblocksStatistics } = useChartsStore()

const selectedScope = ref(CHART_INTERVALS_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadKeyblockStatistics()
  return true
})

if (process.client) {
  watch(selectedScope, async() => {
    await loadKeyblockStatistics()
  })
}

async function loadKeyblockStatistics() {
  await fetchKeyblocksStatistics(
    selectedScope.value.interval,
    selectedScope.value.limit,
    selectedScope.value.customInterval)
}
</script>

<style scoped>
.keyblocks-chart-pane__controls {
  margin-top: var(--space-4);
}
</style>
