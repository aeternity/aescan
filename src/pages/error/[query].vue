<template>
  <div class="search-error">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Search not found</Title>
    </Head>
    <div class="search-error__parallax">
      <page-header>
        Search not found
      </page-header>

      <app-panel class="search-error__panel">
        <p class="search-error__paragraph">
          Oops! We are sorry. The search string
          <span class="search-error__query">
            {{ $route.params.query }}</span>
          was not found.
        </p>

        <p class="search-error__paragraph">
          Ask for help in the
          <app-link to="https://forum.aeternity.com/">
            Forum
          </app-link>
          if the error persists.
        </p>

        <div class="search-error__container">
          <app-button
            to="/"
            class="search-error__button">
            Back to Dashboard
          </app-button>
        </div>
      </app-panel>
    </div>
  </div>
</template>

<script>
import { useHead } from '@vueuse/head'
import AppLink from '@/components/AppLink'
import PageHeader from '@/components/PageHeader'
import AppButton from '@/components/AppButton'
import AppPanel from '@/components/AppPanel'

export default {
  components: { AppButton, PageHeader, AppLink, AppPanel },
  setup() {
    useHead({
      meta: [
        { name: 'robots', content: 'noindex' },
      ],
    })
  },
}
</script>

<style scoped>
.search-error {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__panel {
    margin-top: var(--space-4);
    padding: var(--space-4) var(--space-1);

    @media (--desktop) {
      padding: var(--space-4);
    }
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
    padding: var(--space-3) var(--space-5);
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
