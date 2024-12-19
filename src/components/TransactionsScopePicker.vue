<template>
  <div class="chart-controls__container">
    <scope-picker
      :date="formattedInterval"
      :is-scope-selected="isCustomIntervalSelected"
      placeholder="All Time"
      @updated="selectCustomInterval"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

// Define props
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const model = useVModel(props, 'modelValue', emit)

// todo null handling
// todo this is how formatting look like
const formattedInterval = computed(() => {
  if (!model.value?.customInterval) {
    return []
  }
  return [
    model.value.customInterval.minStart,
    model.value.customInterval.maxStart,
  ]
})

const isCustomIntervalSelected = computed(() => {
  return !!model.value?.customInterval
})

function selectCustomInterval(interval) {
  model.value = interval
    ? {
      minStart: interval[0].toISOString().split('T')[0],
      maxStart: interval[1].toISOString().split('T')[0],
    }
    : null
}
</script>
