<template>
  <app-panel>
    <template #title>
      SMART CONTRACT CALLS
    </template>
    <template #end>
      <chart-controls
        v-model="range"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="contractsStatistics"
      :interval="range.interval"/>

    <chart-controls
      v-model="range"
      class="contracts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/composables/charts'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { contractsStatistics } = storeToRefs(chartsStore)
const { fetchContractsStatistics } = chartsStore

const props = defineProps({
  preselectedRange: {
    type: Object,
    default: CHART_INTERVALS_PRESETS_OPTIONS[4],
  },
})

const range = ref(props.preselectedRange)

await useAsyncData(async() => {
  await loadContractsStatistics()
  return true
})

if (process.client) {
  watch(range, async() => {
    await loadContractsStatistics()
  })
}

async function loadContractsStatistics() {
  await fetchContractsStatistics(
    range.value.interval,
    range.value.limit,
    range.value.customInterval)
}

</script>

<style scoped>
.contracts-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
