<template>
  <Head>
    <Title>Smart Contracts</Title>
  </Head>

  <page-header>
    Smart Contracts
    <template #tooltip>
      {{ contractsHints.contract }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/contracts/">
        Learn more
      </app-link>
    </template>
  </page-header>

  <template v-if="!isLoading">
    <contracts-chart-panel
      class="contracts-panel"
      :scope="CHART_SCOPE_PRESETS_OPTIONS[0]"/>
    <contracts-panel class="contracts-panel"/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.contracts-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
