<template>
  <app-panel>
    <template #title>
      ACTIVE ACCOUNTS
      <hint-tooltip>
        {{ chartsHints.accountsChart }}
      </hint-tooltip>
    </template>
    <template #end>
      <chart-controls
        v-model="selectedScope"
        class="u-hidden-mobile"/>
    </template>

    <line-chart
      :data="accountsStatistics"
      :interval-by="selectedScope.intervalBy"/>

    <chart-controls
      v-model="selectedScope"
      class="accounts-chart-panel__controls u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { CHART_SCOPE_PRESETS_OPTIONS } from '@/utils/constants'
import { chartsHints } from '@/utils/hints/chartsHints'

const { accountsStatistics } = storeToRefs(useChartsStore())
const { fetchAccountsStatistics } = useChartsStore()

const selectedScope = ref(CHART_SCOPE_PRESETS_OPTIONS[4])

await useAsyncData(async() => {
  await loadAccountStatistics()
  return true
})

if (process.client) {
  watch([selectedScope], async() => {
    await loadAccountStatistics()
  })
}

async function loadAccountStatistics() {
  await fetchAccountsStatistics(
    selectedScope.value.intervalBy,
    selectedScope.value.limit,
    selectedScope.value.scope)
}
</script>

<style scoped>
.accounts-chart-panel__controls {
  margin-top: var(--space-4);
}
</style>
