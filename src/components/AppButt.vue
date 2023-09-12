<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
    ]"
    @click="$emit('click')">
    <slot/>
  </button>
</template>

<script setup>

defineEmits(['click'])
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: val => ['primary', 'secondary', 'success', 'error', 'dark'].includes(val),
  }
  ,
})
</script>

<style scoped>
.button {
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
  border: 1px solid var(--color-midnight);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  &--primary {
    background: var(--color-midnight-35);
    color: var(--color-white);
  }

  &--secondary {
    background: var(--color-snow);
    color: var(--color-midnight);
  }

  &--success {
    background: var(--color-success);
    color: var(--color-midnight);
  }

  &--error {
    background: var(--color-error);
    color: var(--color-white);
  }

  &--dark {
    background: var(--color-midnight-55);
    color: var(--color-white);
  }

  &--sm {
    height: 28px;
    padding: var(--space-0) var(--space-1);
  }
}
</style>
