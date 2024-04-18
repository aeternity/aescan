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
  <!--  todo loading-->
  <!--  todo reuse layout-->

  <div class="charts">
    <charts-navigation/>
    <div class="charts__container">
      <template v-if="!isLoading">
        <charts-keyblocks-chart-panel/>
      </template>
      <loader-panel v-else/>
    </div>
  </div>
</template>

<script setup>
import { chartsHints } from '@/utils/hints/chartsHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.charts {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  @media (--desktop) {
    flex-direction: row;
  }

  &__container {
    flex-grow: 1;
  }
}
</style>
