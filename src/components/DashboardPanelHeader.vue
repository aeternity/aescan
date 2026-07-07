<template>
  <header class="dashboard-panel-header">
    <app-badge
      v-if="iconName"
      class="dashboard-panel-header__badge">
      <app-icon
        :name="iconName"
        :size="20"/>
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
  margin: 0 var(--space-2) var(--space-2);

  @media (--desktop) {
    /* 16px matches the reference design's section-header→rail gap */
    margin: 0 0 16px;
  }

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
    margin-right: var(--space-2);
  }

  &__hint {
    margin-left: var(--space-0);
  }

  &__link {
      font-size: 12.5px;
      line-height: 20px;
      font-weight: 600;
      white-space: nowrap;

      @media (--desktop) {
        margin-left: auto;
      }
  }

  &__heading {
    display: flex;
    gap: var(--space-0);
    align-items: center;
    /* Reference design: 15px/700/.05em — override h3 global (20px) */
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.05em;
    font-style: normal;
  }
}
</style>
