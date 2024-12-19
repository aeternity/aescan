<template>
  <div>
    <scope-picker
      :date="formattedDate"
      :is-scope-selected="isCustomIntervalSelected"
      placeholder="All Time"
      @updated="selectScope"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])
const date = useVModel(props, 'modelValue', emit)

// todo null handling
// todo this is how formatting look like
// todo move formating to store
const formattedDate = computed(() => {
  if (!date.value?.customInterval) {
    return []
  }
  return [
    date.value.customInterval.minStart,
    date.value.customInterval.maxStart,
  ]
})

const isCustomIntervalSelected = computed(() => {
  return !!date.value?.customInterval
})

function selectScope(interval) {
  date.value = interval
    ? {
      minStart: interval[0].toISOString().split('T')[0],
      maxStart: interval[1].toISOString().split('T')[0],
    }
    : null
}
</script>
