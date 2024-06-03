<template>
  <Head>
    <Title>AE Coin</Title>
  </Head>

  <page-header>
    AE Coin
    <template #tooltip>
      {{ aeCoinHints.aeCoin }}
    </template>
  </page-header>
  <template v-if="!isLoading">
    <ae-coin-panel/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import { aeCoinHints } from '@/utils/hints/aeCoinHints'

const { isLoading } = useLoading()
</script>
