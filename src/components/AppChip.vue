<template>
  <div
    :class="[ 'chip', variant ? `chip--${variant}` : null ]">
    <slot/>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: val =>
      ['primary', 'secondary', 'success', 'error', 'dark'].includes(val),
  },
})
</script>

<style scoped>
.chip {
  display: inline-flex;
  border-radius: 4px;
  font-family: var(--font-monospaced);
  align-items: center;
  text-align: center;
  height: 28px;
  padding: var(--space-0) var(--space-1);
  letter-spacing: -0.07px;

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
}
</style>
