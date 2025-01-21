<template>
  <app-panel>
    <template #title>
      NAMES ACTIVATED
    </template>
    <template #end>
      <chart-controls
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="namesStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="names-chart-panel__chart__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { namesStatistics } = storeToRefs(chartsStore)
const { fetchNamesStatistics } = chartsStore

const props = defineProps({
  hasSelect: {
    required: true,
    type: Boolean,
  },
  preselectedRange: {
    type: Object,
    default: CHART_INTERVALS_PRESETS_OPTIONS[4],
  },
})

const range = ref(props.preselectedRange)

await useAsyncData(async() => {
  await loadNamesStatistics()
  return true
})

if (process.client) {
  watch(range, async() => {
    await loadNamesStatistics()
  })
}

async function loadNamesStatistics() {
  await fetchNamesStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval)
}
</script>

<style scoped>
.names-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
