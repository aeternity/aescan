<template>
  <div class="top-accounts-panel">
    <header class="top-accounts-panel__header">
      <h2 class="top-accounts-panel__title">
        Account Leaderboard
      </h2>
      <div class="top-accounts-panel__controls">
        <span class="top-accounts-panel__summary">
          {{ summary }}
        </span>
        <app-segmented-control
          v-model="activeTab"
          :options="tabOptions"/>
      </div>
    </header>

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
  </div>
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
  max-width: 100%;
  overflow: hidden;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-panel);

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-1);
    padding: 16px 22px;
    border-bottom: 1px solid var(--border);
  }

  &__title {
    font-size: 15px;
    line-height: 24px;
    font-weight: 600;
    letter-spacing: 0;
  }

  &__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
  }

  &__summary {
    font-size: 12px;
    color: var(--text-faint);
  }

  &__loader {
    margin: var(--space-4) 0;
  }
}
</style>
