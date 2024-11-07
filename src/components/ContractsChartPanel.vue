<template>
  <app-panel>
    <template #title>
      SMART CONTRACT CALLS
    </template>
    <template #end>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="contractsStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
      class="contracts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import LineChart from '@/components/LineChart'

const chartsStore = useChartsStore()
const { contractsStatistics } = storeToRefs(chartsStore)
const { fetchContractsStatistics } = chartsStore

const props = defineProps({
  range: {
    required: true,
    type: Object,
  },
})

const selectedRange = ref(props.range)

await useAsyncData(async () => {
  await loadContractsStatistics()
  return true
})

if (process.client) {
  watch(selectedRange, async () => {
    await loadContractsStatistics()
  })
}

async function loadContractsStatistics() {
  await fetchContractsStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
}

</script>

<style scoped>
.contracts-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
