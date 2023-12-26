<template>
  <page-header>
    Unexpected Error
  </page-header>

  <app-panel class="unexpected-error__panel">
    <template #heading>
      Sorry! We encountered an unexpected error
    </template>
    <p class="unexpected-error__paragraph">
      ERROR CODE: 500 - Internal Server error
    </p>
    <p class="unexpected-error__paragraph">
      We’re not quite sure what went wrong. You can go back, ask for help
      in the
      <app-link to="https://forum.aeternity.com/">
        Forum
      </app-link>
      or tell us your story in the Feedback Survey.
    </p>

    <div class="unexpected-error__container">
      <app-button
        size="lg"
        to="/">
        Back to Dashboard
      </app-button>
    </div>
  </app-panel>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import PageHeader from '@/components/PageHeader'
import AppButton from '@/components/AppButton'
import AppPanel from '@/components/AppPanel'

setResponseStatus(500, 'Unexpected Error')
</script>

<style scoped>
.unexpected-error {
  &__paragraph {
    margin-bottom: var(--space-5);

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

  &__query {
    font-weight: 700;
    word-wrap: break-word;
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
