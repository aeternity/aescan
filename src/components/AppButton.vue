<template>
  <app-link
    v-if="!!to"
    :to="to"
    :target="target"
    :class="[
      'button',
      variant ? `button--${variant}` : null,
    ]">
    <app-icon
      v-if="iconName"
      :name="iconName"
      :size="22"
      class="button__icon"/>
    <slot/>
  </app-link>
  <button
    v-else
    :class="[
      'button',
      variant ? `button--${variant}` : null,
    ]">
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
  variant: {
    type: String,
    default: null,
    validator: val => ['link'].includes(val),
  },
  target: {
    type: String,
    default: '_blank',
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

  padding: var(--space-3) var(--space-5);

  &__icon {
    margin-right: var(--space-1);
  }

  &--link {
    font-weight: 400;
    background: transparent;
    text-decoration: none;
    color: var(--color-blue);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
