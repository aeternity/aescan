<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Page not found</Title>
  </Head>

  <page-header>
    Page not found
  </page-header>

  <not-found-panel>
    Sorry, the page you requested was not found. Perhaps our Dashboard options will help you find the
    way.
  </not-found-panel>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'

useHead({
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})
setResponseStatus(404, 'Page Not Found')
</script>
