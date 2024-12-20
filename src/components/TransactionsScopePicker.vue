<template>
  <div>
    <scope-picker
      :scope="formattedScope"
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
const scope = useVModel(props, 'modelValue', emit)

const isCustomIntervalSelected = computed(() => {
  return !!scope.value?.customInterval
})

function selectScope(interval) {
  scope.value = interval
    ? {
      customInterval: {
        minStart: interval[0].toISOString().split('T')[0],
        maxStart: interval[1].toISOString().split('T')[0],
      },
    }
    : null
  // todo no need sanitize
}

// todo null handling  need sanitize?
// todo this is how formatting look like
// todo move formating to store?
const formattedScope = computed(() => scope.value?.customInterval
  ? [scope.value.customInterval.minStart, scope.value.customInterval.maxStart]
  : [])
</script>
