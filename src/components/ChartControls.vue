<template>
  <div>
    <div class="chart-controls__container">
      <app-chip
        v-for="option in CHART_INTERVALS_OPTIONS"
        :key="option.label"
        class="chart-controls__button"
        :variant="isIntervalSelected(option) ? 'error' : 'secondary'"
        @click="selectInterval(option)">
        {{ option.label }}
      </app-chip>
      <range-picker
        :is-range-selected="isRangeSelected"
        @updated="selectRange"/>
    </div>
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

const selectedTime = useVModel(props, 'modelValue', emit)

const isRangeSelected = computed(() =>
  Object.keys(selectedTime.value).includes('range'))

function isIntervalSelected(option) {
  return selectedTime.value.label === option.label
}

function selectInterval(option) {
  selectedTime.value = option
}

function selectRange(dateRange) {
  const range = {
    range: {
      minStart: dateRange[0].toISOString().split('T')[0],
      maxStart: dateRange[1].toISOString().split('T')[0],
    },
  }
  selectedTime.value = range
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
