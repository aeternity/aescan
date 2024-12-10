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
      <hashrate-chart-panel :range="CHART_INTERVALS_PRESETS_OPTIONS[4]"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { chartsHints } from '@/utils/hints/chartsHints'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'
</script>
