<template>
  <div>
    <app-chip :class="['response-button', {'response-button--activated': !isCollapsed}]">
      Response available
      <app-icon
        class="response-button__icon"
        :name="isCollapsed ? 'plus-circle' : 'minus-circle' "/>
    </app-chip>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.response-button {
  cursor: pointer;
  color: var(--color-midnight);

  &__icon {
    margin-left: var(--space-1);
  }

  &--activated {
    color: var(--color-white);
    background-color: var(--color-midnight-55);
  }
}
</style>
