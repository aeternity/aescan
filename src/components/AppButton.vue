<template>
  <app-link
    v-if="!!to"
    :to="to"
    :target="target"
    class="button">
    <app-icon
      v-if="iconName"
      :name="iconName"
      :size="22"
      class="button__icon"/>
    <slot/>
  </app-link>
  <button
    v-else
    class="button">
    <app-icon
      v-if="iconName"
      :name="iconName"
      :size="22"
      class="button__icon"/>
    <slot/>
  </button>
</template>

<script>
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'

export default {
  name: 'AppButton',
  components: {
    AppIcon,
    AppLink,
  },
  props: {
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
  },
}
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
  padding: var(--space-3) var(--space-7);
  text-decoration: none;
  letter-spacing: 0.015em;

  background: var(--color-fire);
  color: var(--color-white);

  border-radius: 48px;

  border: none;

  &__icon {
    margin-right: var(--space-1);
  }
}
</style>
