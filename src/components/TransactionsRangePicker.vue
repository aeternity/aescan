<template>
  <div class="chart-controls__container">
    <range-picker
      :is-range-selected="isCustomIntervalSelected"
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

const selectedRange = useVModel(props, 'modelValue', emit)
const isCustomIntervalSelected = computed(() => {
  console.log('5 selectedRange.value', selectedRange.value)
  // todo sanitize null
  if (selectedRange.value) {
    return Object.keys(selectedRange.value).includes('customInterval')
  } else {
    return false
  }
})

// const isSelected = computed(() => !!selectedRange.value)

function selectCustomInterval(dateCustomInterval) {
  const customInterval = {
    customInterval: {
      minStart: dateCustomInterval[0].toISOString().split('T')[0],
      maxStart: dateCustomInterval[1].toISOString().split('T')[0],
    },
  }
  selectedRange.value = customInterval
}

</script>

<style scoped>
.chart-controls {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: var(--space-1);
    row-gap: var(--space-1);

    @media (--desktop) {
      display: flex;
      gap: var(--space-1);
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
