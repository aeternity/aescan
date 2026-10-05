<template>
  <list-card>
    <template #title>
      Account Leaderboard
    </template>
    <template #controls>
      <span class="top-accounts-panel__summary">
        {{ summary }}
      </span>
      <app-segmented-control
        v-model="activeTab"
        :options="tabOptions"/>
    </template>

    <template v-if="activeTab === 'top'">
      <top-accounts-table
        v-if="!!topAccounts?.length"
        :top-accounts="topAccounts"/>
      <blank-state v-else/>
    </template>
    <template v-else>
      <recent-accounts-table
        v-if="!!recentAccounts?.length"
        :recent-accounts="recentAccounts"/>
      <loader-indicator
        v-else-if="recentAccounts === null"
        class="top-accounts-panel__loader"/>
      <blank-state v-else/>
    </template>
  </list-card>
</template>

<script setup>
const tabOptions = [
  { value: 'top', label: 'Top Accounts' },
  { value: 'recent', label: 'Active (24h)' },
]

const activeTab = ref('top')

const { topAccounts, recentAccounts, totalAccountsCount, activeAccountsCount } = storeToRefs(useTopAccountsStore())
const { fetchTopAccounts, fetchRecentAccounts } = useTopAccountsStore()

const recentSummary = computed(() => {
  const shown = recentAccounts.value.length
  return activeAccountsCount.value > shown
    ? `Latest ${shown} of ${formatNumber(activeAccountsCount.value)} accounts active in the last 24h`
    : `${shown} accounts active in the last 24h`
})

const summary = computed(() => {
  if (activeTab.value === 'recent') {
    return recentAccounts.value?.length ? recentSummary.value : ''
  }
  if (!topAccounts.value?.length) {
    return ''
  }
  const top = `Top ${topAccounts.value.length}`
  return totalAccountsCount.value ? `${top} of ${formatNumber(totalAccountsCount.value)} accounts` : top
})

useAsyncData(async () => {
  await fetchTopAccounts()
  return true
})

// Recent accounts are fetched on first use only, as the query walks several pages of transactions
watch(activeTab, (tab) => {
  if (tab === 'recent' && !recentAccounts.value) {
    fetchRecentAccounts()
  }
})
</script>

<style scoped>
.top-accounts-panel {
  &__summary {
    font-size: 12px;
    color: var(--text-faint);
  }

  &__loader {
    margin: var(--space-4) 0;
  }
}
</style>
