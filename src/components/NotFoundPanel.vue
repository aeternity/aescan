<template>
  <app-panel class="not-found-panel">
    <p class="not-found-panel__paragraph">
      <slot/>
    </p>

    <p class="not-found-panel__paragraph">
      Ask for help in the
      <app-link to="https://forum.aeternity.com/">
        Forum
      </app-link>
      if the error persists.
    </p>

    <div class="not-found-panel__container">
      <app-button
        to="/"
        size="sm"
        class="not-found-panel__button">
        Back to Dashboard
      </app-button>
    </div>
  </app-panel>
</template>

<script setup>
import AppButton from '@/components/AppButton'
import AppLink from '@/components/AppLink'
import AppPanel from '@/components/AppPanel'
</script>

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

  &__button {
    width: 215px;
    color: #fff !important;
  }

  &__container {
    display: flex;
    justify-content: center;

    @media (--desktop) {
      justify-content: flex-start;
    }
  }
}
</style>
