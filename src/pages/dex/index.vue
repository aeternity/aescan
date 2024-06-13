<template>
  <Head>
    <Title>Dex Tracker</Title>
  </Head>

  <page-header>
    Dex Tracker
    <template #tooltip>
      {{ tokensHints.token }}
    </template>
  </page-header>

  <dex-trades-panel/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import { tokensHints } from '@/utils/hints/tokensHints'

const { isLoading } = useLoading()
</script>
