<template>
  <span :class="['hint-icon', {'hint-icon--dark': variant === 'dark'}]">
    ?
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'light',
    validator: val =>
      ['light', 'dark'].includes(val),
  },
})
</script>

<style scoped>
.hint-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  border: 1px solid var(--text-faint);
  border-radius: 50%;
  color: var(--text-faint);
  font-family: var(--font-primary);
  font-size: 9px;
  font-weight: 400;
  line-height: 1;
  cursor: help;
  flex-shrink: 0;

  &--dark {
    border-color: var(--text-dim);
    color: var(--text-dim);
  }
}
</style>
