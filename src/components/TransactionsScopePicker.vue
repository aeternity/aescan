<template>
  <div class="chart-controls__container">
    <scope-picker
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

function selectCustomInterval(dateCustomInterval) {
  const customInterval = {
    customInterval: {
      minStart: dateCustomInterval[0].toISOString().split('T')[0],
      maxStart: dateCustomInterval[1].toISOString().split('T')[0],
    },
  }
  selectedScope.value = customInterval
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
