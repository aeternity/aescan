<template>
  <app-panel class="account-names-panel">
    <paginated-content
      :entities="accountNames"
      @prev-clicked="loadPrevAccountNames"
      @next-clicked="loadNextAccountNames">
      <account-names-table
        class="account-names-panel__account-names-table"
        :account-names="accountNames"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchAccountNames } = useAccountStore()
const { accountNames } = storeToRefs(useAccountStore())

async function loadPrevAccountNames() {
  await fetchAccountNames({ queryParameters: accountNames.value.prev.substring(3) })
}

async function loadNextAccountNames() {
  await fetchAccountNames({ queryParameters: accountNames.value.next.substring(3) })
}
</script>

<style scoped>
.account-names-panel__account-names-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
