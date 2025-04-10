<template>
  <Head>
    <Title>Price</Title>
  </Head>
  <!--todo hints-->
  <!--todo tests-->
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
      <price-chart-panel :scope="CHART_SCOPE_PRESETS_OPTIONS[4]"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { chartsHints } from '@/utils/hints/chartsHints'
</script>
