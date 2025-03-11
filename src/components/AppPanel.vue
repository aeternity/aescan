<template>
  <div class="panel">
    <header
      v-if="$slots.title"
      class="panel__header">
      <h2 class="panel__heading h3">
        <slot name="title"/>
      </h2>
      <div class="panel__end">
        <slot name="end"/>
      </div>
    </header>
    <slot/>
  </div>
</template>

<style scoped>
.panel {
  max-width: 100%;
  background: var(--color-white);
  border-radius: 8px;
  padding: var(--space-4) var(--space-1);

  &:has(table) {
    padding: var(--space-4) 0;
  }

  @media (--desktop) {
    padding: var(--space-4);

    &:has(table) {
      padding: var(--space-4);
    }
  }

  &__header {
    padding: var(--space-1) var(--space-1) 0 var(--space-1);

    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: var(--space-1) 0 var(--space-4);
    }
  }

  &__heading {
    margin-bottom: var(--space-1);
  }

  &__end {
    padding: var(--space-1) 0;
    display: flex;
    gap: var(--space-1);

    @media (--desktop) {
      padding: 0;
    }

    &:empty {
      padding: 0;
    }
  }
}
</style>
