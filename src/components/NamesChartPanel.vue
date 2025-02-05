<template>
  <app-panel>
    <template #title>
      NAMES ACTIVATED
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="namesStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="names-chart-panel__chart__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { CHART_INTERVALS_PRESETS_OPTIONS, CHART_SCOPE_PRESETS_OPTIONS } from '@/utils/constants'

const { namesStatistics } = storeToRefs(useChartsStore())
const { fetchNamesStatistics } = useChartsStore()

const props = defineProps({
  scope: {
    required: true,
    type: Boolean,
  },

})

const selectedScope = ref(props.scope)

await useAsyncData(async() => {
  await loadNamesStatistics()
  return true
})

if (process.client) {
  watch(selectedScope, async() => {
    await loadNamesStatistics()
  })
}

async function loadNamesStatistics() {
  await fetchNamesStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.names-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
