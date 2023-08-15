<template>
  <div class="panel">
    <header
      v-if="$slots.heading"
      class="panel__header">
      <h2 class="panel__heading h3">
        <slot name="heading"/>
      </h2>
      <div class="panel__container">
        <slot name="header"/>
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

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__header {
    padding: var(--space-1) 0 0 0;
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

  &__container {
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
