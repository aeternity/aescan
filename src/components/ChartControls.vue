<template>
  <div>
    <div class="chart-controls__container">
      <app-chip
        v-for="option in CHART_INTERVALS_PRESETS_OPTIONS"
        :key="option.label"
        class="chart-controls__button"
        :variant="isPresetSelected(option) ? 'error' : 'secondary'"
        @click="selectPreset(option)">
        {{ option.label }}
      </app-chip>
      <!--      todo improve naming-->

      <scope-picker
        :is-scope-selected="isCustomIntervalSelected"
        @updated="selectCustomInterval"/>
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

const selectedScope = useVModel(props, 'modelValue', emit)

const isCustomIntervalSelected = computed(() =>
  Object.keys(selectedScope.value).includes('customInterval'))

function isPresetSelected(option) {
  return selectedScope.value.label === option.label
}

function selectPreset(option) {
  selectedScope.value = option
}

function selectCustomInterval(dateCustomInterval) {
  console.log('selectCustomInterval dateCustomInterval[0]', dateCustomInterval[0])
  console.log('selectCustomInterval dateCustomInterval[0]', typeof dateCustomInterval[0])

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
