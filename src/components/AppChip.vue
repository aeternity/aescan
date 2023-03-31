<template>
  <div
    :class="[
      'chip',
      variant ? `chip--${variant}` : null,
      size ? `chip--${size}` : null,
    ]">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppChip',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: val =>
        ['primary', 'secondary', 'success', 'error'].includes(val),
    },
    size: {
      type: String,
      default: null,
      validator: val => ['sm'].includes(val),
    },
  },
}
</script>

<style scoped>
.chip {
  display: inline-flex;
  border-radius: 4px;
  font-family: var(--font-monospaced);
  align-items: center;
  text-align: center;
  height: 28px;
  font-size: 12px;
  line-height: 20px;
  padding: var(--space-0) var(--space-1);

  @media (--desktop) {
    height: 32px;
    font-size: 14px;
    padding: 6px var(--space-1);
  }

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

  &--sm {
    height: 28px;
    padding: var(--space-0) var(--space-1);
  }
}
</style>
