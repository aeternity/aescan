<template>
  <app-panel>
    <template #title>
      NAMES ACTIVATED TREND
    </template>
    <template #end>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <div class="names-chart-panel__container">
      <line-chart
        :data="namesStatistics"
        :interval="selectedRange.interval"/>
    </div>

    <chart-controls
      v-model="selectedRange"
      class="names-chart-panel__chart__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'

const chartsStore = useChartsStore()
const { namesStatistics } = storeToRefs(chartsStore)
const { fetchNamesStatistics } = chartsStore

const props = defineProps({
  range: {
    required: true,
    type: Object,
  },
})

const selectedRange = ref(props.range)

await useAsyncData(async() => {
  await loadNamesStatistics()
  return true
})

if (process.client) {
  watch(selectedRange, async() => {
    await loadNamesStatistics()
  })
}

async function loadNamesStatistics() {
  await fetchNamesStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
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
