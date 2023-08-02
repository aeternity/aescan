<template>
  <Head>
    <Title>
      {{ APP_TITLE_SHORT }} | Unexpected Error
    </Title>

    <Meta
      name="description"
      :content="APP_DESCRIPTION"/>
    <Meta
      name="keywords"
      :content="APP_KEYWORDS"/>
    <Link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon-apple-180.png"/>
    <Link
      rel="icon"
      type="image/png"
      sizes="512x512"
      href="/favicon-512.png"/>
    <Link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon-96.png"/>
    <Link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32.png"/>
    <Meta
      property="og:type"
      content="website"/>
    <Meta
      property="og:title"
      :content="APP_TITLE"/>
    <Meta
      property="og:description"
      :content="APP_DESCRIPTION"/>
    <Meta
      property="og:image"
      :content="`${APP_URL}/social-cover.png`"/>
    <Meta
      property="og:image:width"
      content="1200"/>
    <Meta
      property="og:image:height"
      content="600"/>
    <Meta
      property="og:image:alt"
      :content="APP_TITLE"/>
    <Meta
      property="og:url"
      :content="APP_URL"/>
    <Meta
      name="twitter:card"
      content="summary_large_image"/>
    <Meta
      name="twitter:site"
      :content="APP_CREATOR"/>
    <Meta
      name="twitter:creator"
      :content="APP_CREATOR"/>
  </Head>

  <the-header/>
  <div class="error">
    <div class="error__parallax">
      <page-header>
        Unexpected Error
      </page-header>

      <app-panel class="error__panel">
        <h1 class="error__heading">
          Sorry! We encountered an unexpected error
        </h1>
        <p class="error__paragraph">
          ERROR CODE: 500 - Internal Server error
        </p>
        <p class="error__paragraph">
          We’re not quite sure what went wrong. You can go back, ask for help
          in the
          <app-link to="https://forum.aeternity.com/">
            Forum
          </app-link>
          or tell us your story in the Feedback Survey.
        </p>

        <div class="error__container">
          <app-button
            to="/"
            class="error__button">
            Back to Dashboard
          </app-button>
        </div>
      </app-panel>
    </div>
  </div>
  <the-footer class="app__footer"/>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import AppLink from '@/components/AppLink'
import PageHeader from '@/components/PageHeader'
import AppButton from '@/components/AppButton'
import AppPanel from '@/components/AppPanel'
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'
import { APP_CREATOR, APP_DESCRIPTION, APP_KEYWORDS, APP_TITLE, APP_URL } from '~/utils/constants'

useHead({
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})
setResponseStatus(500, 'Unexpected Error')
</script>

<style scoped>
.error {
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

  &__heading {
    margin-bottom: var(--space-4);
  }

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
    padding: var(--space-3) var(--space-5);
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
