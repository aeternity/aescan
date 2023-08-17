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
      {{ errorData.searchQuery }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'

const error = useError()
const errorData = computed(() => {
  if (typeof error.value.data === 'string') {
    return JSON.parse(error.value.data)
  }

  return error.value.data
})
</script>
