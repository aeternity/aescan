<template>
  <div class="chart-controls__container">
    <scope-picker
      v-model="selectedScope"
      :is-scope-selected="isCustomIntervalSelected"
      placeholder="All Time"
      @updated="selectCustomInterval"/>
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
// todo minimalize

const selectedScope = useVModel(props, 'modelValue', emit)

const isCustomIntervalSelected = computed(() => {
  // todo sanitize null
  if (selectedScope.value) {
    return Object.keys(selectedScope.value).includes('customInterval')
  } else {
    return false
  }
})

// const isSelected = computed(() => !!selectedScope.value)

function selectCustomInterval(interval) {
  console.log('selectCustomInterval', interval)
  selectedScope.value = {
    minStart: interval[0].toISOString().split('T')[0],
    maxStart: interval[1].toISOString().split('T')[0],
  }
  console.log('selectedScope.value', selectedScope.value)
}

</script>
