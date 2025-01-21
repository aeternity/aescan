<template>
  <Head>
    <Title>Tokens</Title>
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
import { tokensHints } from '@/utils/hints/tokensHints'

const { isLoading } = useLoading()
</script>
