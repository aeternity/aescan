<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Search Not Found</Title>
  </Head>

  <page-header>
    Search Not Found
  </page-header>

  <not-found-panel>
    Oops! We are sorry. The search query
    <q>
      {{ errorData.searchQuery }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const errorData = computed(() => {
  const error = unref(props.error)
  if (typeof error.data === 'string') {
    return JSON.parse(error.data)
  }

  return error.data
})
</script>
