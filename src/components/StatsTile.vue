<template>
  <div class="stats-tile">
    <app-badge>
      <app-icon
        :name="iconName"
        :size="32"/>
    </app-badge>
    <div class="stats-tile__body">
      <div class="stats-tile__title h4">
        <!--          todo h4 or h5-->
        {{ title }}
        <hint-tooltip class="stats-tile__tooltip">
          <slot name="tooltip"/>
        </hint-tooltip>
      </div>
      <slot/>
    </div>
  </div>
</template>
<script>
import AppIcon from '@/components/AppIcon'
import HintTooltip from '@/components/HintTooltip'
import AppBadge from '@/components/AppBadge'

export default {
  name: 'StatsTile',
  components: { AppBadge, HintTooltip, AppIcon },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.stats-tile {
  display: flex;
  flex-direction: row;
  word-break: break-word;

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.005em;
    margin-left: var(--space-3);

    @media (--desktop) {
      font-size: 14px;
      margin-left: var(--space-2);
    }
  }

  &__title {
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.03em;
    @media (--desktop) {
      margin-bottom: var(--space-0);
    }
  }

  &__tooltip {
    margin-left: var(--space-0);
    height: 21px;
  }
}
</style>
