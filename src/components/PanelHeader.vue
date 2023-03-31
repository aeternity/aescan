<template>
  <header class="panel-header">
    <app-badge
      v-if="iconName"
      class="panel-header__badge">
      <app-icon
        :name="iconName"
        :size="32"/>
    </app-badge>
    <div class="panel-header__body">
      <div class="panel-header__container">
        <div class="panel-header__title">
          {{ title }}
          <hint-tooltip v-if="$slots.tooltip">
            <slot name="tooltip"/>
          </hint-tooltip>
        </div>
        <slot name="header"/>
      </div>

      <app-link
        v-if="showAllLink"
        :to="showAllLink"
        class="panel-header__link">
        Show all
      </app-link>
    </div>
  </header>
</template>

<script>
import AppIcon from '@/components/AppIcon'
import AppBadge from '@/components/AppBadge'
import AppLink from '@/components/AppLink'
import HintTooltip from '@/components/HintTooltip'

export default {
  name: 'PanelHeader',
  components: { AppLink, AppIcon, AppBadge, HintTooltip },
  props: {
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
  },
}
</script>

<style scoped>
.panel-header {
  display: flex;
  flex-direction: row;

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
    text-decoration: underline;
    @media (--desktop) {
      font-size: 16px;
      line-height: 24px;
      margin-left: auto;
    }
  }

  &__title {
    display: flex;
    gap: var(--space-0);
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.03em;
    font-style: normal;
    font-weight: 500;
    @media (--desktop) {
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
