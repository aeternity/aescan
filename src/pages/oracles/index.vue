<template>
  <Head>
    <Title>Oracles</Title>
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
import { oraclesHints } from '@/utils/hints/oraclesHints'

const { isLoading } = useLoading()
</script>
