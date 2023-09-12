<template>
  <header class="dashboard-panel-header">
    <app-badge
      v-if="iconName"
      class="dashboard-panel-header__badge">
      <app-icon
        :name="iconName"
        :size="32"/>
    </app-badge>
    <div class="dashboard-panel-header__body">
      <div class="dashboard-panel-header__container">
        <component
          :is="level"
          class="dashboard-panel-header__heading h3">
          {{ title }}
          <hint-tooltip v-if="$slots.tooltip">
            <slot name="tooltip"/>
          </hint-tooltip>
        </component>
        <slot name="header"/>
      </div>

      <app-link
        v-if="showAllLink"
        :to="showAllLink"
        is-text-link
        class="dashboard-panel-header__link">
        Show all
      </app-link>
    </div>
  </header>
</template>

<script setup>
import AppIcon from '@/components/AppIcon'
import AppBadge from '@/components/AppBadge'
import AppLink from '@/components/AppLink'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  level: {
    type: String,
    required: true,
    validator: val => ['h2', 'h3', 'h4', 'h5'].includes(val),
  },
  iconName: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  showAllLink: {
    type: String,
    default: null,
  },
})
</script>

<style scoped>
.dashboard-panel-header {
  display: flex;
  flex-direction: row;
  margin-bottom: var(--space-4);

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    @media (--desktop) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
  }

  &__badge {
    margin-right: var(--space-3);
  }

  &__hint {
    margin-left: var(--space-0);
  }

  &__link {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    white-space: nowrap;
    @media (--desktop) {
      font-size: 16px;
      line-height: 24px;
      margin-left: auto;
    }
  }

  &__heading {
    display: flex;
    gap: var(--space-0);
    font-style: normal;
  }
}
</style>
