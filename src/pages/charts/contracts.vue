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
      <contracts-chart-panel :scope="CHART_SCOPE_PRESETS_OPTIONS[4]"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { CHART_SCOPE_PRESETS_OPTIONS } from '@/utils/constants'

import { chartsHints } from '@/utils/hints/chartsHints'
</script>
