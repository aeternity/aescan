<template>
  <app-panel class="not-found-panel">
    <p class="not-found-panel__paragraph">
      <slot/>
    </p>

    <p class="not-found-panel__paragraph">
      Maybe the
      <app-link to="https://forum.aeternity.com/">
        community
      </app-link>
      can help you.
    </p>

    <div class="not-found-panel__container">
      <app-button
        to="/"
        class="not-found-panel__button">
        Back to Dashboard
      </app-button>
    </div>
  </app-panel>
</template>

<style scoped>
.not-found-panel {
  margin-top: var(--space-4);
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__paragraph {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      &:last-of-type {
        margin-bottom: var(--space-6);
      }
    }
  }

  &__container {
    display: flex;
    justify-content: center;

    @media (--desktop) {
      justify-content: flex-start;
    }
  }

  &__button {
    width: 215px;
    padding: var(--space-3) var(--space-5);
  }
}
</style>
