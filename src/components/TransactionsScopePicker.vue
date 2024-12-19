<template>
  <div class="chart-controls__container">
    <scope-picker
      :date="aaa"
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

const aaa = computed(() => {
  // todo this is how formatting look like
  const bbb =
    [fff.value?.customInterval?.minStart,
      fff.value?.customInterval?.maxStart]
  return bbb
})

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
  console.log('interval', interval)
  if (interval) {
    const rrrr = {
      minStart: interval[0].toISOString().split('T')[0],
      maxStart: interval[1].toISOString().split('T')[0],
    }
    fff.value = rrrr
  } else {
    fff.value = null
  }
}

//
// function selectCustomInterval(interval) {
//   console.log('11interval', interval)
//   const rrrr = {
//     minStart: interval[0] ? interval[0].toISOString().split('T')[0] : null,
//     maxStart: interval[1] ? interval[1].toISOString().split('T')[0] : null,
//   }
//   console.log('rrrr', rrrr)
//   fff.value = rrrr
// }

</script>
