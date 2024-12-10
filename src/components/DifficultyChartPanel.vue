<template>
  <app-panel>
    <template #title>
      DIFFICULTY
    </template>
    <template #end>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="difficultyStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
      class="difficulty-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '~/utils/constants'

const chartsStore = useChartsStore()
const { difficultyStatistics } = storeToRefs(chartsStore)
const { fetchDifficultyStatistics } = chartsStore

const props = defineProps({
  range: {
    required: true,
    type: Object,
  },
})

const selectedRange = ref(CHART_INTERVALS_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadDifficultytatistics()
  return true
})

if (process.client) {
  watch([selectedRange], async() => {
    await loadDifficultytatistics()
  })
}

async function loadDifficultytatistics() {
  await fetchDifficultyStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
}
</script>

<style scoped>
.difficulty-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
