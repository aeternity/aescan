<template>
  <app-chip :class="['expand-button', {'expand-button--activated': isExpanded}]">
    <slot/>
    <app-icon
      class="expand-button__icon"
      :name="isExpanded ? 'minus-circle' :'plus-circle'"/>
  </app-chip>
</template>

<script setup>
defineProps({
  isExpanded: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.expand-button {
  cursor: pointer;
  color: var(--color-white);
  background-color: var(--color-midnight-55);

  &__icon {
    margin-left: var(--space-1);
  }

  &--activated {
    color: var(--color-midnight);
    background-color: var(--color-snow);
  }
}
</style>
