<template>
  <div>
    <div class="chart-controls__container">
      <app-chip
        v-for="option in CHART_SCOPE_PRESETS_OPTIONS"
        :key="option.label"
        class="chart-controls__button"
        :variant="isPresetSelected(option) ? 'error' : 'secondary'"
        @click="selectPreset(option)">
        {{ option.label }}
      </app-chip>

      <scope-picker
        :is-scope-selected="isCustomScopeSelected"
        @updated="selectCustomScope"/>
    </div>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
})

const selectedScope = useVModel(props, 'modelValue', emit)

const isCustomScopeSelected = computed(() => Object.keys(selectedScope.value).includes('scope'))

function selectCustomScope(scope) {
  selectedScope.value = {
    scope: {
      minStart: scope[0],
      maxStart: scope[1],
    },
  }
}

function isPresetSelected(option) {
  return selectedScope.value.label === option.label
}

function selectPreset(option) {
  selectedScope.value = option
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
