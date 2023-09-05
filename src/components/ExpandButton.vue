<template>
  <div>
    <app-chip :class="['expand-button', {'expand-button--activated': !isCollapsed}]">
      <slot/>
      <app-icon
        class="expand-button__icon"
        :name="isCollapsed ? 'plus-circle' : 'minus-circle' "/>
    </app-chip>
  </div>
</template>

<script setup>
defineProps({
  isCollapsed: {
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
