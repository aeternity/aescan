<template>
  <app-panel>
    <template #title>
      DIFFICULTY
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="difficultyStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="difficulty-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const { difficultyStatistics } = storeToRefs(useChartsStore())
const { fetchDifficultyStatistics } = useChartsStore()

const props = defineProps({
  scope: {
    required: true,
    type: Object,
  },
})

const selectedScope = ref(props.scope)

await useAsyncData(async() => {
  await loadDifficultytatistics()
  return true
})

if (process.client) {
  watch([selectedScope, selectedTxType], async() => {
    await loadDifficultytatistics()
  })
}

async function loadDifficultytatistics() {
  await fetchDifficultyStatistics(
    selectedScope.value.preset,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.difficulty-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
