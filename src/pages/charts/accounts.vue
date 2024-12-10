<template>
  <Head>
    <Title>Charts</Title>
  </Head>

  <page-header>
    Charts
    <template #tooltip>
      {{ chartsHints.charts }}
    </template>
  </page-header>

  <NuxtLayout name="master-detail">
    <template #master>
      <charts-navigation/>
    </template>
    <template #detail>
      <accounts-chart-panel/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { chartsHints } from '@/utils/hints/chartsHints'
</script>
