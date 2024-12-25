<template>
  <app-panel>
    <template #title>
      SMART CONTRACT CALLS
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="contractsStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="contracts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'
import { CHART_SCOPE_PRESETS_OPTIONS } from '@/utils/constants'

const { contractsStatistics } = storeToRefs(useChartsStore())
const { fetchContractsStatistics } = useChartsStore()

const props = defineProps({
  scope: {
    required: true,
    type: Object,
    default: CHART_INTERVALS_PRESETS_OPTIONS[4],
  },
})
// todo is props needed?
// todo directly bind props
const selectedScope = ref(props.scope)

await useAsyncData(async() => {
  await loadContractsStatistics()
  return true
})

if (process.client) {
  watch(selectedScope, async() => {
    await loadContractsStatistics()
  })
}

async function loadContractsStatistics() {
  await fetchContractsStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope)
}

</script>

<style scoped>
.contracts-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
