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
  <tokens-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import TokensPanel from '@/components/TokensPanel'
import { tokensHints } from '@/utils/hints/tokensHints'

const isLoading = useLoading()
</script>
