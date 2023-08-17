<template>
  <app-link
    v-if="!!to"
    :to="to"
    :target="target"
    :class="['button',`button--size-${size}`]">
    <app-icon
      v-if="iconName"
      :name="iconName"
      :size="22"
      class="button__icon"/>
    <slot/>
  </app-link>
  <button
    v-else
    :class="['button',`.button--size-${size}`]">
    <app-icon
      v-if="iconName"
      :name="iconName"
      :size="22"
      class="button__icon"/>
    <slot/>
  </button>
</template>

<script setup>
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'

defineProps({
  iconName: {
    type: String,
    default: null,
  },
  to: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: '_blank',
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md'].includes(value),
  },
})
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  text-align: center;
  cursor: pointer;

  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 0.015em;

  background: var(--color-fire);
  color: var(--color-white);

  border-radius: 48px;
  border: none;

  &--size-sm {
    padding: var(--space-3) var(--space-5);
  }

  &--size-md {
    padding: var(--space-3) var(--space-7);
  }

  &__icon {
    margin-right: var(--space-1);
  }
}
</style>
