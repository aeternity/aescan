<template>
  <Html>
    <Head>
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

  <NuxtErrorBoundary @error="logError">
    <the-header/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <the-footer class="app__footer"/>

    <template #error="{ error }">
      <error :error="error"/>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { storeToRefs } from 'pinia'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import Error from '@/error'
import { initializeStores } from '@/stores'
import { useWebSocket } from '@/stores/webSocket'
import { useUiStore } from '@/stores/ui'
import { APP_CREATOR, APP_DESCRIPTION, APP_KEYWORDS, APP_TITLE, APP_URL } from '@/utils/constants'

const { isMobileMenuOpen } = storeToRefs(useUiStore())
const router = useRouter()
const route = useRoute()

await useAsyncData(() => initializeStores())

if (process.client) {
  const { initializeWebSocket } = useWebSocket()
  initializeWebSocket()
}

useHead({
  titleTemplate: pageTitle =>
    pageTitle
      ? `${pageTitle} ${route.params.id} | ${APP_TITLE_SHORT}`
      : APP_TITLE,
})

if (import.meta.env.MODE !== 'production') {
  useHead({
    meta: [{ name: 'robots', content: 'noindex' }],
  })
}

function logError(error) {
  console.error(error)
}

const detectedHistoryNavigation = ref(null)

router.options.history.listen((_to, _from, meta) => {
  if (meta.type !== 'pop') {
    return
  }

  detectedHistoryNavigation.value = meta.direction
})

router.beforeEach((_to, from, next, abort) => {
  if (detectedHistoryNavigation.value === 'back') {
    detectedHistoryNavigation.value = null

    if (isMobileMenuOpen.value && from.hash !== MENU_HASH) {
      isMobileMenuOpen.value = false
      abort()
      return
    }
  }

  next()
})
</script>

<style>
/* stylelint-disable selector-id-pattern*/
#__nuxt {
  height: 100%;
  display: flex;
  flex-direction: column;
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
    margin-top: auto;
  }
}
</style>
