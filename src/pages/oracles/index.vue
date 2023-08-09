<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Oracles</Title>
  </Head>

  <page-header>
    Oracles

    <template #tooltip>
      {{ oraclesHints.oracle }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/oracles/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <oracles-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import OraclesPanel from '@/components/OraclesPanel'
import { oraclesHints } from '@/utils/hints/oraclesHints'

const nuxtApp = useNuxtApp()
const isLoading = ref(true)
nuxtApp.hook('page:start', () => {
  isLoading.value = true
})
nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})
</script>
