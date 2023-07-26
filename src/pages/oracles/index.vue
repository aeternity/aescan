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

  <oracles-panel/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import OraclesPanel from '@/components/OraclesPanel'
import { oraclesHints } from '@/utils/hints/oraclesHints'
</script>
