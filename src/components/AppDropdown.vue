<template>
  <VMenu :disabled="isDisabled">
    <span>
      <slot/>
    </span>

    <template #popper>
      <slot name="menu"/>
    </template>
  </VMenu>
</template>

<script setup>
defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style>
.v-popper__popper.v-popper--theme-menu .v-popper__inner {
  margin: 0 var(--space-2);
  color: var(--color-midnight);
  padding: var(--space-2) !important;
}
</style>
