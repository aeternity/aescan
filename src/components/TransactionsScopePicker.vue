<template>
  <div class="chart-controls__container">
    <scope-picker
      v-model="fff"
      :is-scope-selected="isCustomIntervalSelected"
      placeholder="All Time"
      @updated="selectCustomInterval"/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})
// todo minimalize

const emit = defineEmits(['update:modelValue'])
const fff = useVModel(props, 'modelValue', emit)

const isCustomIntervalSelected = computed(() => {
  // todo sanitize null
  if (fff.value) {
    return Object.keys(fff.value).includes('customInterval')
  } else {
    return false
  }
})

// const isSelected = computed(() => !!fff.value)

function selectCustomInterval(interval) {
  const rrrr = {
    minStart: interval[0].toISOString().split('T')[0],
    maxStart: interval[1].toISOString().split('T')[0],
  }

  fff.value = rrrr
}

</script>
