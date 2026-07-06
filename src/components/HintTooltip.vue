<template>
  <app-tooltip
    :skidding="60"
    has-fixed-width>
    <span class="hint-tooltip__icon">
      <hint-icon :variant="variant"/>
    </span>
    <template #tooltip>
      <slot/>
    </template>
  </app-tooltip>
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
.hint-tooltip__icon {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  /* Gap between the ? icon and the following label/text */
  margin-right: var(--space-0);
  /* Compensate the ~1px vertical offset from vertical-align:middle */
  transform: translateY(-1px);
}
</style>
