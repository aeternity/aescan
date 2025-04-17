<template>
  <button
    :class="[
      'pagination-button',
      $slots.default ? [`pagination-button--${direction}`] : [],
      {'pagination-button--disabled': disabled},
    ]"
    @click="!disabled && $emit('click')">
    <app-icon
      v-if="direction === 'left'"
      :size="16"
      name="caret-left"/>
    <slot/>

    <app-icon
      v-if="direction === 'right'"
      :size="16"
      name="caret-right"/>
  </button>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    required: true,
    validator: (val) => ['left', 'right'].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.pagination-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-0);
  height: 28px;
  color: var(--color-midnight);
  background: transparent;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  font-family: var(--font-primary);
  border: 1px solid var(--color-midnight-55);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  &:active {
    color: var(--color-blue);
  }

  &--left {
    padding: var(--space-0) var(--space-1) var(--space-0) var(--space-0);
  }

  &--right {
    padding: var(--space-0) var(--space-0) var(--space-0) var(--space-1);
  }

  &--disabled {
    pointer-events: none;
    cursor: not-allowed;
    border-color: var(--color-midnight-35);
    color: var(--color-midnight-35);
  }
}
</style>
