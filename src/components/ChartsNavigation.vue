<template>
  <nav class="charts-navigation">
    <app-panel class="charts-navigation__panel">
      <app-link
        to="/charts/transactions"
        class="charts-navigation__link">
        Transactions
      </app-link>
      <app-link
        to="/charts/keyblocks"
        class="charts-navigation__link">
        Keyblocks
      </app-link>
    </app-panel>
  </nav>
</template>

<style scoped>
.charts-navigation {
  width: 100%;
  @media (--desktop) {
    width: 200px;

  }

  &__panel {
    display: flex;
    flex-direction: row;

    @media (--desktop) {
      flex-direction: column;
    }
  }

  &__link {
    display: flex;

    &:not(:last-child) {
      margin-right: var(--space-3);

      @media (--desktop) {
        margin-bottom: var(--space-1);

      }
    }
  }

}
</style>
