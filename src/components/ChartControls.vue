<template>
  <div>
    <div class="chart-controls__container">
      <app-chip
        v-for="(option, index) in CHART_INTERVALS_OPTIONS"
        :key="index"
        class="chart-controls__button"
        :variant="selectedIndex === index ? 'error' : 'secondary'"
        @click="selectInterval(index)">
        {{ option.label }}
      </app-chip>
      <range-picker
        :is-range-set="hasCustomDate"
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

const selectedIndex = computed(() =>
  CHART_INTERVALS_OPTIONS.findIndex(interval => interval.label === selectedTime.value.label))
// todo move index to interval options
// todo custom index in here
// todo add type

const hasCustomDate = computed(() => Object.keys(selectedTime.value).includes('range'))

function selectInterval(index) {
  selectedTime.value = CHART_INTERVALS_OPTIONS[index]
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
