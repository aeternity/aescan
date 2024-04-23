<template>
  <app-panel>
    <template #heading>
      KEYBLOCKS MINED
    </template>
    <template #header>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="keyblocksStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
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

const selectedRange = ref(CHART_INTERVALS_OPTIONS[4])

await useAsyncData(async() => {
  await loadKeyblockStatistics()
  return true
})

watch(selectedRange, async() => {
  await loadKeyblockStatistics()
})

async function loadKeyblockStatistics() {
  await fetchKeyblocksStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
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
}
</style>
