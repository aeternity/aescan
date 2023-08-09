<template>
  <Html>
    <Head>
      <Title>{{ APP_TITLE_SHORT }}</Title>
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
  </Html>

  <the-header/>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :duration="3000"
      :throttle="300"
      :color="false"/>
    <NuxtPage/>
  </NuxtLayout>
  <the-footer class="app__footer"/>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import { initializeStores } from '@/stores'
import { useWebSocket } from '@/stores/webSocket'
import { APP_CREATOR, APP_DESCRIPTION, APP_KEYWORDS, APP_TITLE, APP_URL } from '@/utils/constants'

await useAsyncData(() => initializeStores())

if (process.client) {
  const { initializeWebSocket } = useWebSocket()
  initializeWebSocket()
}

if (import.meta.env.MODE !== 'production') {
  useHead({
    meta: [{ name: 'robots', content: 'noindex' }],
  })
}
</script>

<style>
#app {
  height: 100%;
}
</style>

<style>
.nuxt-loading-indicator {
  background: var(--color-fire);
}
</style>

<style scoped>
.app {
  &__footer {
    flex-shrink: 0; /* force footer on bottom of a screen */
  }
}
</style>
