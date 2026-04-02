<template>
  <app-panel :title-to="props.titleTo">
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
const props = defineProps({
  titleTo: {
    type: String,
    default: null,
  },
})

const { difficultyStatistics } = storeToRefs(useChartsStore())
const { fetchDifficultyStatistics } = useChartsStore()

const selectedScope = ref(CHART_SCOPE_PRESETS_OPTIONS[0])

useAsyncData(async () => {
  await loadDifficultytatistics()
  return true
})

if (import.meta.client) {
  watch([selectedScope], async () => {
    await loadDifficultytatistics()
  })
}

async function loadDifficultytatistics() {
  await fetchDifficultyStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.difficulty-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
