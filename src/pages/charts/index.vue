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

  <div class="charts">
    <nav class="charts__navigation">
      <app-panel>
        <app-link to="/charts">
          Transactions
        </app-link>
      </app-panel>
    </nav>
    <div class="charts__container">
      <template v-if="!isLoading">
        <charts-transactions-chart-panel/>
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

  &__navigation {
    width: 200px;
  }
}
</style>
