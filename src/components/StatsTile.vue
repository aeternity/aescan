<template>
  <div class="stats-tile">
    <app-badge>
      <app-icon
        :name="iconName"
        :size="20"/>
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
  word-break: break-all;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-tile);
  padding: var(--space-2);
  transition: border-color var(--dur) var(--ease);

  &:hover {
    border-color: var(--brand-line);
  }

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: var(--space-2);
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 11.5px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text);

    @media (--desktop) {
      margin-bottom: var(--space-0);
    }
  }

  &__tooltip {
    margin-left: var(--space-0);
  }

  &__slot {
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 18px;
    color: var(--text-dim);
  }
}
</style>
