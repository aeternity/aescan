<template>
  <Head>
    <Title>{{ errorData.entityName }} not found</Title>
  </Head>

  <page-header>
    Not Found
  </page-header>

  <not-found-panel>
    Oops! We are sorry. The {{ errorData.entityName }} identified by
    <q>
      {{ errorData.entityId }}
    </q>
    was not found. (´･ω･`)?
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

setResponseStatus(404, `${errorData.value.entityName} Not Found`)
</script>
