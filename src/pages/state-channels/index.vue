<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | State Channels</Title>
  </Head>

  <page-header>
    State Channels

    <template #tooltip>
      {{ stateChannelsHints.stateChannel }}
      <app-link
        variant="primary"
        to="https://aeternity.com/state-channels">
        Learn more
      </app-link>
    </template>
  </page-header>

  <state-channels-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const nuxtApp = useNuxtApp()
const isLoading = ref(true)
nuxtApp.hook('page:start', () => {
  isLoading.value = true
})
nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})

</script>
