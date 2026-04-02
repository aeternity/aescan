<template>
  <app-panel :title-to="props.titleTo">
    <template #title>
      KEYBLOCKS MINED
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="keyblocksStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="keyblocks-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
const props = defineProps({
  titleTo: {
    type: String,
    default: null,
  },
})

const { keyblocksStatistics } = storeToRefs(useChartsStore())
const { fetchKeyblocksStatistics } = useChartsStore()

const selectedScope = ref(CHART_SCOPE_PRESETS_OPTIONS[0])

useAsyncData(async () => {
  await loadKeyblockStatistics()
  return true
})

if (import.meta.client) {
  watch(selectedScope, async () => {
    await loadKeyblockStatistics()
  })
}

async function loadKeyblockStatistics() {
  await fetchKeyblocksStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.keyblocks-chart-pane__controls {
  margin-top: var(--space-4);
}
</style>
