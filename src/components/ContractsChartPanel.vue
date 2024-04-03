<template>
  <app-panel>
    <template #heading>
      CONTRACT CALLS
    </template>
    <template #header>
      <chart-controls
        v-model="selectedTime"
        class="u-hidden-mobile"/>
    </template>

    <div class="contracts-chart-panel__container">
      <line-chart
        :data="contractsStatistics"
        :interval="selectedTime.interval"/>
    </div>

    <chart-controls
      v-model="selectedTime"
      class="contracts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useContractsStore } from '@/stores/contracts'
import LineChart from '@/components/LineChart'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'

const contractsStore = useContractsStore()
const { contractsStatistics } = storeToRefs(contractsStore)
const { fetchContractsStatistics } = contractsStore

const selectedTime = ref(CHART_INTERVALS_OPTIONS[0])

await useAsyncData(async() => {
  await loadContractsStatistics()
  return true
})

watch(selectedTime, async() => {
  await loadContractsStatistics()
})

async function loadContractsStatistics() {
  await fetchContractsStatistics(
    selectedTime.value.interval,
    selectedTime.value.limit,
    selectedTime.value.range)
}

</script>

<style scoped>
.contracts-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__controls {
    margin-top: var(--space-4);
  }
}
</style>
