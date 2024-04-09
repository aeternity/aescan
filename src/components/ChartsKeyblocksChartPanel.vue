<template>
  <app-panel>
    <template #heading>
      KEYBLOCKS MINED
    </template>
    <template #header>
      <chart-controls
        v-model="selectedTime"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="keyblocksStatistics"
      :interval="selectedTime.interval"/>

    <chart-controls
      v-model="selectedTime"
      class="charts-keyblocks-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'
import { CHART_INTERVALS_OPTIONS } from '@/utils/constants'

const chartsStore = useChartsStore()
const { keyblocksStatistics } = storeToRefs(chartsStore)
const { fetchKeyblocksStatistics } = chartsStore

const selectedTime = ref(CHART_INTERVALS_OPTIONS[4])

await useAsyncData(async() => {
  await loadKeyblockStatistics()
  return true
})

watch(selectedTime, async() => {
  await loadKeyblockStatistics()
})

async function loadKeyblockStatistics() {
  await fetchKeyblocksStatistics(
    selectedTime.value.interval,
    selectedTime.value.limit,
    selectedTime.value.range)
}
</script>

<style scoped>
.charts-keyblocks-chart-panel {
  &__controls {
    margin-top: var(--space-4);
    margin-bottom: var(--space-2);

    &--desktop {
      margin-bottom: 0;
    }
  }

  &__select {
    width: 210px;
  }
}
</style>
