<template>
  <app-panel>
    <template #heading>
      NAMES ACTIVATED TREND
    </template>
    <template #header>
      <chart-controls
        v-model="selectedTime"
        class="u-hidden-mobile"/>
    </template>

    <div class="names-chart-panel__container">
      <line-chart
        :data="namesStatistics"
        :interval="selectedTime.interval"/>
    </div>

    <chart-controls
      v-model="selectedTime"
      class="names-chart-panel__chart__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { useNamesStore } from '@/stores/names'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'

const namesStore = useNamesStore()
const { namesStatistics } = storeToRefs(namesStore)
const { fetchNamesStatistics } = namesStore

const selectedTime = ref(CHART_INTERVALS_OPTIONS[0])

await useAsyncData(async() => {
  await loadNamesStatistics()
  return true
})

if (process.client) {
  watch(selectedTime, async() => {
    await loadNamesStatistics()
  })
}

async function loadNamesStatistics() {
  await fetchNamesStatistics(
    selectedTime.value.interval,
    selectedTime.value.limit,
    selectedTime.value.customInterval)
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
