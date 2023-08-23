<template>
  <div>
    <Head>
      <Title> {{ APP_TITLE_SHORT }}</Title>

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

    <NuxtErrorBoundary>
      <the-header/>
      <div class="error">
        <div class="error__parallax">
          <component
            :is="errorComponent(error)"
            v-if="error"
            :error="error"/>
        </div>
      </div>
      <the-footer/>

      <template #error="{ error: innerError }">
        <the-header/>
        <div class="error">
          <div class="error__parallax">
            <component
              :is="errorComponent(innerError)"
              v-if="error && innerError"
              :error="innerError"/>
          </div>
        </div>
        <the-footer/>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import { APP_CREATOR, APP_DESCRIPTION, APP_KEYWORDS, APP_TITLE, APP_URL } from '@/utils/constants'

useHead({
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

const error = useError()

const errorComponent = error => {
  switch (unref(error)?.statusMessage) {
  case 'EntityDetailsNotFound':
    return defineAsyncComponent(() => import('@/errors/EntityDetailsNotFoundError.vue'))
  case 'SearchNotFound':
    return defineAsyncComponent(() => import('@/errors/SearchNotFoundError.vue'))
  case 'PageNotFound':
    return defineAsyncComponent(() => import('@/errors/PageNotFoundError.vue'))
  default:
    return defineAsyncComponent(() => import('@/errors/UnexpectedError.vue'))
  }
}
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
}
</style>
