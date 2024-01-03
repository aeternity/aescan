<template>
  <app-panel>
    <template #heading>
      TRANSACTIONS TREND
    </template>
    <template #header>
      <chart-controls
        class="names-chart-panel__chart-controls"
        @selected="loadNamesStatistics"/>
    </template>
    <div class="names-chart-panel__container">
      <line-chart
        v-if="namesStatistics"
        :statistics="namesStatistics"
        :selected-interval="selectedInterval"/>
    </div>

    <chart-controls
      class="names-chart-panel__chart-controls--condensed"
      @selected="loadNamesStatistics"/>
  </app-panel>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useNamesStore } from '@/stores/names'
import LineChart from '@/components/LineChart'

const namesStore = useNamesStore()
const { namesStatistics } = storeToRefs(namesStore)
const { fetchNamesStatistics } = namesStore

const selectedInterval = ref('')

await useAsyncData(async() => {
  await fetchNamesStatistics()
  return true
})

async function loadNamesStatistics({ interval, limit, range }) {
  selectedInterval.value = interval
  await fetchNamesStatistics(interval, limit, range)
}
</script>

<style scoped>
.names-chart-panel {
  &__container {
    position: relative;
    height: 250px;
  }

  &__controls {
    margin-top: var(--space-4);
  }
}

</style>
