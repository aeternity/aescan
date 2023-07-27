<template>
  <app-icon
    name="question"
    :size="17"
    :class="['hint-icon', {'hint-icon--dark': variant === 'dark'}]"/>
</template>

<script setup>
import AppIcon from '@/components/AppIcon'

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
  position: relative;
  margin-bottom: 3px;
  color: var(--color-midnight-25);

  &--dark {
    color: var(--color-midnight);
  }
}
</style>
