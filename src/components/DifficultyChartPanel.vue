<template>
  <app-panel>
    <template #title>
      DIFFICULTY CHART
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

const chartsStore = useChartsStore()
const { difficultyStatistics } = storeToRefs(chartsStore)
const { fetchDifficultyStatistics } = chartsStore

const props = defineProps({
  hasSelect: {
    required: true,
    type: Boolean,
  },
  range: {
    required: true,
    type: Object,
  },
})

const selectedRange = ref(props.range)
const selectedTxType = ref(TX_TYPES_OPTIONS[0])

await useAsyncData(async() => {
  await loadDifficultytatistics()
  return true
})

if (process.client) {
  watch([selectedRange, selectedTxType], async() => {
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
.difficulty-chart-panel {
  &__controls {
    margin-top: var(--space-4);
    margin-bottom: var(--space-2);

    &--desktop {
      margin-bottom: 0;
    }
  }
}
</style>
