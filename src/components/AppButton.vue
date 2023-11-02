<template>
  <app-link
    v-if="!!to"
    :to="to"
    :target="target"
    :class="[
      'button',
      size ? `button--${size}` : null,
      variant ? `button--${variant}` : null,
    ]"
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
    :class="[
      'button',
      variant ? `button--${variant}` : null,
      size ? `button--${size}` : null,
    ]"
    :type="type"
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
  size: {
    type: String,
    default: null,
    validator: val => ['lg', 'sm'].includes(val),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: val => [
      'link',
      'link-error',
      'primary',
      'light', 'link']
      .includes(val),
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

  padding: var(--space-0) var(--space-1);

  border-radius: 4px;

  &--lg {
    border-radius: 48px;
    padding: var(--space-3) var(--space-5);
  }

  &--primary {
    background: var(--color-fire);
    color: var(--color-white);
    border: none;
  }

  &--light {
    background: var(--color-white);
    color: var(--color-midnight);
    border: 1px solid var(--color-midnight-55);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &__icon {
    margin-right: var(--space-1);
  }

  &--link {
    color: var(--color-blue);
    text-align: left;
    text-decoration: none;
    font-weight: 400;
    border: 0;

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
