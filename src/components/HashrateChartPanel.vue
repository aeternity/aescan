<template>
  <app-panel>
    <template #title>
      HASHRATE
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="hashrateStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="hashrate-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import { CHART_SCOPE_PRESETS_OPTIONS } from '~/utils/constants'

const chartsStore = useChartsStore()
const { hashrateStatistics } = storeToRefs(chartsStore)
const { fetchHashrateStatistics } = chartsStore
const { hashrateStatistics } = storeToRefs(useChartsStore())
const { fetchHashrateStatistics } = useChartsStore()

const props = defineProps({
  scope: {
    required: true,
    type: Object,
  },
})

const selectedScope = ref(CHART_SCOPE_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadHashratetatistics()
  return true
})

if (process.client) {
  watch([selectedScope, selectedTxType], async() => {
    await loadHashratetatistics()
    // todo fix typo
  })
}

async function loadHashratetatistics() {
  await fetchHashrateStatistics(
    selectedScope.value.preset,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.hashrate-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
