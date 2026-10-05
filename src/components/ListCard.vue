<template>
  <div class="list-card">
    <header
      v-if="$slots.title || $slots.controls"
      class="list-card__header">
      <h2 class="list-card__title">
        <slot name="title"/>
      </h2>
      <div class="list-card__controls">
        <slot name="controls"/>
      </div>
    </header>
    <slot/>
  </div>
</template>

<style scoped>
/* Card for list tables as in the reference design: hairline header row, 22px cell padding */
.list-card {
  max-width: 100%;
  overflow: hidden;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-panel);

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    padding: 16px 22px;
    border-bottom: 1px solid var(--border);
  }

  &__title {
    font-size: 15px;
    line-height: 24px;
    font-weight: 600;
    letter-spacing: 0;
  }

  &__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
  }

  :deep(table) {
    margin-bottom: 0;
  }

  :deep(th),
  :deep(td) {
    padding-right: 22px;
    padding-left: 22px;
  }

  :deep(th) {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  :deep(thead tr) {
    background: transparent;
    border-bottom: 1px solid var(--border);
  }
}
</style>
