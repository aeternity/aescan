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
const { hashrateStatistics } = storeToRefs(useChartsStore())
const { fetchHashrateStatistics } = useChartsStore()

const selectedScope = ref(CHART_SCOPE_PRESETS_OPTIONS[4])

useAsyncData(async () => {
  await loadHashrateStatistics()
  return true
})

if (import.meta.client) {
  watch([selectedScope], async () => {
    await loadHashrateStatistics()
  })
}

async function loadHashrateStatistics() {
  await fetchHashrateStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.hashrate-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
