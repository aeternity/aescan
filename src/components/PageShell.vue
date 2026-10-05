<template>
  <div class="page-shell">
    <header class="page-shell__header">
      <h1 class="page-shell__title">
        {{ title }}
        <hint-tooltip v-if="$slots.tooltip">
          <slot name="tooltip"/>
        </hint-tooltip>
      </h1>
      <p
        v-if="$slots.subtitle"
        class="page-shell__subtitle">
        <slot name="subtitle"/>
      </p>
    </header>
    <slot/>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
/* Page container and heading of the redesigned inner pages (use with the `empty` layout) */
.page-shell {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-3) var(--space-1) var(--space-6);

  @media (--desktop) {
    padding: 26px var(--space-4) 90px;
  }

  &__header {
    margin: 0 0 20px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    margin-bottom: 5px;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);

    @media (--desktop) {
      font-size: 26px;
    }
  }

  &__subtitle {
    margin: 0;
    font-size: 13px;
    color: var(--text-dim);
  }
}
</style>
