<template>
  <app-panel>
    <template v-if="!!topAccounts?.length">
      <top-accounts-table :top-accounts="topAccounts"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
const { topAccounts } = storeToRefs(useTopAccountsStore())
const { fetchTopAccounts } = useTopAccountsStore()

useAsyncData(async() => {
  await fetchTopAccounts()
  return true
})
</script>
