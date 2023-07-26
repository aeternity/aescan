<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Tokens</Title>
  </Head>

  <page-header>
    Tokens

    <template #tooltip>
      {{ tokensHints.token }}
    </template>
  </page-header>

  <tokens-panel/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import TokensPanel from '@/components/TokensPanel'
import { tokensHints } from '@/utils/hints/tokensHints'
</script>
