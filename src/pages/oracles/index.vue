<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Oracles</Title>
  </Head>

  <page-header>
    Oracles

    <template #tooltip>
      {{ oraclesHints.oracle }}
    </template>
  </page-header>

  <oracles-panel/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import OraclesPanel from '@/components/OraclesPanel'
import { oraclesHints } from '@/utils/hints/oraclesHints'
</script>
