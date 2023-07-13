<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | State Channels</Title>
  </Head>

  <page-header>
    State Channels

    <template #tooltip>
      {{ stateChannelsHints.stateChannel }}
    </template>
  </page-header>

  <state-channels-panel/>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
</script>
