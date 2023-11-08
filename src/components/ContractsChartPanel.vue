<template>
  <app-panel>
    <template #heading>
      CONTRACT CALLS
    </template>
    <template #header>
      <chart-controls
        class="u-hidden-mobile"
        @selected="loadContractsStatistics"/>
    </template>

    <div class="contracts-chart-panel__container">
      <line-chart
        v-if="contractsStatistics"
        :statistics="contractsStatistics"
        :selected-interval="selectedInterval"/>
    </div>

    <chart-controls
      class="contracts-chart-panel__chart-controls u-hidden-desktop"
      @selected="loadContractsStatistics"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useContractsStore } from '@/stores/contracts'
import LineChart from '@/components/LineChart'

const contractsStore = useContractsStore()
const { contractsStatistics } = storeToRefs(contractsStore)
const { fetchContractsStatistics } = contractsStore

const selectedInterval = ref('')

await useAsyncData(async() => {
  await fetchContractsStatistics()
  return true
})

async function loadContractsStatistics({ interval, limit, range }) {
  selectedInterval.value = interval
  await fetchContractsStatistics(interval, limit, range)
}

</script>

<style scoped>
.contracts-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__chart-controls {
    margin-top: var(--space-4);
  }
}
</style>
