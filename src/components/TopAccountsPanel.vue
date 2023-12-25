<template>
  <app-panel>
    <top-accounts-table
      :top-accounts="topAccounts"
      class="u-hidden-mobile"/>
    <top-accounts-table-condensed
      :top-accounts="topAccounts"
      class="u-hidden-desktop"/>
  </app-panel>
</template>

<script setup>
import { useTopAccountsStore } from '@/stores/topAccounts'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'
import TopAccountsTable from '@/components/TopAccountsTable'
import TopAccountsTableCondensed from '@/components/TopAccountsTableCondensed'

const topAccountsStore = useTopAccountsStore()
const { topAccounts } = storeToRefs(topAccountsStore)
const { fetchTopAccounts } = useTopAccountsStore()
const { fetchTotalStats } = useBlockchainStatsStore()

await useAsyncData(async() => {
  await fetchTopAccounts()
  await fetchTotalStats()
  return true
})
</script>
