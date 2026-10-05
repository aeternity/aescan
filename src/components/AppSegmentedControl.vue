<template>
  <div class="segmented-control">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="[
        'segmented-control__option',
        {'segmented-control__option--active': option.value === modelValue},
      ]"
      @click="$emit('update:modelValue', option.value)">
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.segmented-control {
  display: flex;
  gap: 3px;
  background: var(--bg-elev2);
  border: 1px solid var(--border);
  border-radius: var(--r-control);
  padding: 3px;

  &__option {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 12px;
    border-radius: 7px;
    cursor: pointer;
    white-space: nowrap;
    color: var(--text-faint);
    background: transparent;
    border: none;

    &--active {
      background: var(--bg-elev);
      color: var(--text);
      box-shadow: var(--shadow);
    }
  }
}
</style>
