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
import TopAccountsTable from '@/components/TopAccountsTable'
import TopAccountsTableCondensed from '@/components/TopAccountsTableCondensed'

const { topAccounts } = storeToRefs(useTopAccountsStore())
const { fetchTopAccounts } = useTopAccountsStore()

await useAsyncData(async() => {
  await fetchTopAccounts()
  return true
})
</script>
