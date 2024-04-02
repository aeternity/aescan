<template>
  <div class="chart-controls__container">
    <app-chip
      v-for="(option, index) in intervalOptions"
      :key="index"
      class="chart-controls__button"
      :variant="selectedIndex === index ? 'error' : 'secondary'"
      @click="selectInterval(index)">
      {{ option.label }}
    </app-chip>
    <range-picker
      :is-active="selectedIndex === 'custom'"
      :is-range-set="hasCustomDate"
      @updated="selectRange"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const intervalOptions = [
  { interval: 'day', limit: '7', label: '1W' },
  { interval: 'day', limit: '30', label: '1M' },
  { interval: 'day', limit: '90', label: '3M' },
  { interval: 'month', limit: '12', label: '1Y' },
  { interval: 'month', limit: '100', label: 'ALL' },
]

const selectedIndex = ref(props.preselectedIntervalIndex)
// todo add type
const selectedAAA = useVModel(props, 'modelValue', emit)

const hasCustomDate = computed(() => {
  return selectedIndex.value === 'custom'
})

function selectInterval(index) {
  selectedIndex.value = index
  selectedAAA.value = intervalOptions[index]
}

function selectRange(dateRange) {
  selectedIndex.value = 'custom'
  const range = {
    range: {
      minStart: dateRange[0].toISOString().split('T')[0],
      maxStart: dateRange[1].toISOString().split('T')[0],
    },
  }
  selectedAAA.value = range
}

</script>

<style scoped>
.chart-controls {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 8px;
    row-gap: 8px;

    @media (--desktop) {
      display: flex;
      gap: 8px;
      flex-grow: 1;
      flex-wrap: nowrap;
    }
  }

  &__button {
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
