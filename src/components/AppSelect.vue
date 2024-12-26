<template>
  <vue-multiselect
    v-model="selectedValue"
    :options="options"
    :show-labels="false"
    :label="label"
    :track-by="trackBy"
    :placeholder="placeholder"
    :disabled="disabled"
    :searchable="searchable"
    :hide-selected="hideSelected"
    :preselect-first="preselectFirst"
    :class="[
      size ? `multiselect--${size}` : null,
    ]">
    <template
      v-for="(_, slot) of $slots"
      #[slot]="scope">
      <slot
        :name="slot"
        v-bind="scope"/>
    </template>
    <template #caret>
      <div class="multiselect__select">
        <app-icon name="caret-down"/>
      </div>
    </template>
  </vue-multiselect>
</template>

<script setup>
import VueMultiselect from 'vue-multiselect'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  placeholder: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  trackBy: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideSelected: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  preselectFirst: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: null,
    validator: val => ['sm'].includes(val),
  },
  modelValue: undefined,
})
const emit = defineEmits(['update:modelValue'])
const selectedValue = useVModel(props, 'modelValue', emit)
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect {
  width: 100%;
  font-family: var(--font-monospaced);

  @media (--desktop) {
    width: 320px;
    margin: 0;
  }

  &__tags {
    padding: 10px var(--space-6) 0 var(--space-1);
    border-radius: 8px;
    border-color: var(--color-midnight-55);
    border-width: 1px;
    cursor: pointer;
  }

  &__single {
    color: var(--color-midnight);
    font-size: 14px;
    line-height: 20px;
    padding-left: var(--space-0);
  }

  &__content-wrapper {
    box-shadow: 2px 2px 14px 5px rgb(78 78 86 / 20%);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &--above &__content-wrapper {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &__option {
    display: flex;
    align-items: center;
    border: solid var(--color-midnight-35);
    border-width: 1px 0;
    color: solid var(--color-midnight);
    font-size: 14px;
    line-height: 20px;

    &:last-child {
      border-width: 1px 0 0;
    }

    &--selected {
      background: var(--color-midnight-35);
    }

    &--highlight {
      background: var(--color-midnight-15);
    }

    &--selected&--highlight {
      background: var(--color-midnight-35);
      color: var(--color-midnight);
    }
  }

  &__input {
    font-size: 14px;
    line-height: 20px;
  }

  &__select {
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
      border: 0;
    }
  }

  &--active {
    .multiselect__tags {
      box-shadow: 2px 2px 14px 5px rgb(78 78 86 / 20%);
      border-radius: 8px;
    }
  }

  &--disabled {
    background: transparent;
    opacity: 0.5;

    .multiselect__select {
      background: transparent;
    }
  }

  &__placeholder {
    color: var(--color-midnight-35);
    font-size: 14px;
    line-height: 20px;
    padding-left: var(--space-0);
    padding-top: 0;
    margin-bottom: var(--space-0);
  }

  &--sm {
    .multiselect__tags {
      min-height: 31px;
      padding: 0 var(--space-6) 0 var(--space-1);
    }

    .multiselect__single {
      padding-top: var(--space-0);
      margin-bottom: var(--space-0);
    }

    .multiselect__input {
      padding-top: var(--space-0);
      margin-bottom: var(--space-0);
    }

    .multiselect__select {
      height: 32px;
    }
  }
}
</style>
