<template>
  <div class="page-overview">
    <div class="page-overview__tiles">
      <slot name="tiles"/>
    </div>
    <slot/>
  </div>
</template>

<style scoped>
/* Stat tiles on the left, chart card on the right; stacked on narrow screens */
.page-overview {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  margin-bottom: 14px;

  @media (width >= 960px) {
    grid-template-columns: 330px minmax(0, 1fr);
  }

  &__tiles {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* Reference design: compact chart card with a mixed-case title instead of the uppercase panel heading */
  :deep(.panel) {
    display: flex;
    flex-direction: column;
    padding: 14px 18px;
    border-radius: var(--r-panel);
  }

  :deep(.panel__header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    padding: 0;
    margin-bottom: 6px;
  }

  :deep(.panel__heading) {
    margin: 0;
    font-size: 15px;
    line-height: 24px;
    font-weight: 600;
    letter-spacing: 0;
  }
}
</style>
