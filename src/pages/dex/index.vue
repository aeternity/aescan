<template>
  <Head>
    <Title>Dex Tracker</Title>
  </Head>
  <!--  todo hint-->

  <page-header>
    Dex Tracker
    <template #tooltip>
      {{ tokensHints.token }}
    </template>
  </page-header>

  <dex-trades-panel/>
  <!--  <loading-panel v-else/>-->
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import { tokensHints } from '@/utils/hints/tokensHints'

// const { isLoading } = useLoading()
</script>
