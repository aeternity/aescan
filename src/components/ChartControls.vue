<template>
  <div>
    <div class="chart-controls__container">
      <button
        v-for="option in CHART_SCOPE_PRESETS_OPTIONS"
        :key="option.label"
        type="button"
        :class="[
          'chart-controls__button',
          {'chart-controls__button--active': isPresetSelected(option)},
        ]"
        @click="selectPreset(option)">
        {{ option.label }}
      </button>

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
/* Segmented control as in the reference design */
.chart-controls {
  &__container {
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 3px;
    background: var(--bg-elev2);
    border: 1px solid var(--border);
    border-radius: 8px;
  }

  &__button {
    flex: 1;
    padding: 5px 11px;
    font-family: var(--font-primary);
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    color: var(--text-faint);
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 6px;

    &:hover {
      color: var(--text);
    }

    &--active,
    &--active:hover {
      color: #fff;
      background: var(--brand);
    }
  }

  /* Custom range picker input styled as one more segment */
  &__container :deep(.scope-picker) {
    flex: 1.6;
  }

  &__container :deep(.scope-picker__input) {
    width: 100%;
    height: 26px;
    padding: 5px 11px;
    font-family: var(--font-primary);
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    color: var(--text-faint);
    cursor: pointer;
    background: transparent;
    border-radius: 6px;

    &::placeholder {
      color: var(--text-faint);
    }

    &.scope-picker__input--active {
      color: #fff;
      background: var(--brand) !important;

      &::placeholder {
        color: #fff;
      }
    }

    @media (--desktop) {
      width: 68px;

      &.scope-picker__input--active {
        width: 208px;
      }
    }
  }
}
</style>
