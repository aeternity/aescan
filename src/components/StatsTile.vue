<template>
  <div class="stats-tile">
    <app-badge>
      <app-icon
        :name="iconName"
        :size="32"/>
    </app-badge>
    <div class="stats-tile__container">
      <h3 class="stats-tile__title h5">
        {{ title }}
        <hint-tooltip class="stats-tile__tooltip">
          <slot name="tooltip"/>
        </hint-tooltip>
      </h3>
      <div class="stats-tile__slot">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon'
import HintTooltip from '@/components/HintTooltip'
import AppBadge from '@/components/AppBadge'

defineProps({
  iconName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.stats-tile {
  display: flex;
  flex-direction: row;
  word-break: break-word;
  padding: var(--space-1) 0;

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: var(--space-3);

    @media (--desktop) {
      margin-left: var(--space-2);
    }
  }

  &__title {
    display: flex;
    align-items: center;
    @media (--desktop) {
      margin-bottom: var(--space-0);
    }
  }

  &__tooltip {
    margin-left: var(--space-0);
  }

  &__slot {
    font-family: var(--font-monospaced);
  }
}
</style>
