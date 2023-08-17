<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search not found</Title>
  </Head>

  <page-header>
    Search not found
  </page-header>

  <not-found-panel>
    Oops! We are sorry. The search string
    <q>
      {{ route.params.query }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'

const route = useRoute()
</script>
