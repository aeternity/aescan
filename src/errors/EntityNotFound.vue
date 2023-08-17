<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | {{ errorData.entityName }} not found</Title>
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

const error = useError()
const errorData = computed(() => {
  if (typeof error.value.data === 'string') {
    return JSON.parse(error.value.data)
  }
  
  return error.value.data
})

setResponseStatus(404, `${errorData.value.entityName} Not Found`)
</script>
