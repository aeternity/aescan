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
      :interval="selectedScope.interval"/>

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
  hasSelect: {
    required: true,
    type: Boolean,
  },
  scope: {
    required: true,
    type: Object,
  },
})

const selectedScope = ref(props.scope)
const selectedTxType = ref(TX_TYPES_OPTIONS[0])

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
    selectedScope.value.interval,
    selectedScope.value.limit,
    selectedScope.value.customInterval)
}
</script>

<style scoped>
.difficulty-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
