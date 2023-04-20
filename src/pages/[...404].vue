<template>
  <div class="not-found-error">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Page not found</Title>
    </Head>
    <div class="not-found-error__parallax">
      <page-header>
        Page not found
      </page-header>

      <app-panel class="not-found-error__panel">
        <p class="not-found-error__paragraph">
          Sorry, the page you requested was not found. Perhaps our Dashboard options will help you find the
          way.
        </p>

        <p
          class="
          not-found-error__paragraph">
          Maybe the
          <app-link to="https://forum.aeternity.com/">community
          </app-link>
          can help you.
        </p>

        <div class="not-found-error__container">
          <app-button
            to="/"
            class="not-found-error__button">
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
    setResponseStatus(404, 'Page Not Found')
  },
}
</script>

<style scoped>
.not-found-error {
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
