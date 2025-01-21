<template>
  <app-panel>
    <template #title>
      DIFFICULTY
    </template>
    <template #end>
      <chart-controls
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="difficultyStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="difficulty-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { difficultyStatistics } = storeToRefs(chartsStore)
const { fetchDifficultyStatistics } = chartsStore

const range = ref(CHART_INTERVALS_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadDifficultytatistics()
  return true
})

if (process.client) {
  watch([range], async() => {
    await loadDifficultytatistics()
  })
}

async function loadDifficultytatistics() {
  await fetchDifficultyStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval)
}
</script>

<style scoped>
.difficulty-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
