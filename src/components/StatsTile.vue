<template>
  <div class="stats-tile">
    <app-badge>
      <app-icon
        :name="iconName"
        :size="16"/>
    </app-badge>
    <div class="stats-tile__container">
      <div class="stats-tile__title">
        {{ title }}
        <hint-tooltip class="stats-tile__tooltip">
          <slot name="tooltip"/>
        </hint-tooltip>
      </div>
      <div class="stats-tile__slot">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  align-items: center;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-tile);
  padding: 9px 11px;
  gap: 9px;
  transition: border-color var(--dur) var(--ease);

  &:hover {
    border-color: var(--brand-line);
  }

  :deep(.badge) {
    /* Override AppBadge to the reference spec: 34×34, radius 9px */
    width: 34px;
    height: 34px;
    border-radius: 9px;
    flex-shrink: 0;
  }

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text);
    margin-bottom: 3px;
    white-space: nowrap;
  }

  &__tooltip {
    /* gap: 4px on __title flex handles spacing; no extra margin needed */
  }

  &__slot {
    /* Labels inherit sans-serif from body; only values (stats-panel__value) are mono */
    font-size: 11px;
    line-height: 1.45;
    color: var(--text-dim);
  }
}
</style>
