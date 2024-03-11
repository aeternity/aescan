<template>
  <app-link
    v-if="!!to"
    :to="to"
    :target="target"
    :class="['button', [`button--${variant}`]]"
    :disabled="disabled">

    <app-icon
      v-if="iconName"
      :name="iconName"
      :size="22"
      class="button__icon"/>
    <slot/>
  </app-link>
  <button
    v-else
    :type="type"
    :class="['button', [`button--${variant}`]]"
    :disabled="disabled">
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
  variant: {
    type: String,
    default: null,
    validator: val => ['link', 'link-error'].includes(val),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &__icon {
    margin-right: var(--space-1);
  }

  &--link {
    color: var(--color-blue);
    text-decoration: none;
    font-weight: 400;

    background: transparent;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }

  &--link-error {
    color: var(--color-fire);
    text-decoration: none;
    font-weight: 400;

    background: transparent;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
