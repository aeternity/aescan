<template>
  <Head>
    <Title>Accounts</Title>
  </Head>

  <page-header>
    Top 100 Accounts
    <template #tooltip>
      {{ topAccountsHints.topAccounts }}
    </template>
  </page-header>

  <accounts-statistics class="accounts-panel"/>
  <accounts-chart-panel
    class="accounts-panel"
    :scope="CHART_SCOPE_PRESETS_OPTIONS[0]"/>
  <top-accounts-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import { topAccountsHints } from '@/utils/hints/topAccountsHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.accounts-panel {
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
