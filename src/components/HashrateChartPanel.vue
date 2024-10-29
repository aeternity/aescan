<template>
  <app-panel>
    <template #title>
      HASHRATE
    </template>
    <template #end>
      <chart-controls
        v-model="selectedRange"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="hashrateStatistics"
      :interval="selectedRange.interval"/>

    <chart-controls
      v-model="selectedRange"
      class="hashrate-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChartsStore } from '@/stores/charts'

const chartsStore = useChartsStore()
const { hashrateStatistics } = storeToRefs(chartsStore)
const { fetchHashrateStatistics } = chartsStore

const props = defineProps({
  hasSelect: {
    required: true,
    type: Boolean,
  },
  range: {
    required: true,
    type: Object,
  },
})

const selectedRange = ref(props.range)
const selectedTxType = ref(TX_TYPES_OPTIONS[0])

await useAsyncData(async() => {
  await loadHashratetatistics()
  return true
})

if (process.client) {
  watch([selectedRange, selectedTxType], async() => {
    await loadHashratetatistics()
  })
}

async function loadHashratetatistics() {
  await fetchHashrateStatistics(
    selectedRange.value.interval,
    selectedRange.value.limit,
    selectedRange.value.customInterval)
}
</script>

<style scoped>
.hashrate-chart-panel {
  &__controls {
    margin-top: var(--space-4);
    margin-bottom: var(--space-2);

    &--desktop {
      /*todo remove*/
      margin-bottom: 0;
    }
  }
}
</style>
