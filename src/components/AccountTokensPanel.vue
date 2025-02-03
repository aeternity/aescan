<template>
  <app-panel class="account-tokens-panel">
    <paginated-content
      :entities="accountTokens"
      @prev-clicked="loadPrevAccountTokens"
      @next-clicked="loadNextAccountTokens">
      <account-tokens-table :account-tokens="accountTokens"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

const accountStore = useAccountStore()
const { fetchAccountTokens } = accountStore
const { accountTokens } = storeToRefs(accountStore)

async function loadPrevAccountTokens() {
  await fetchAccountTokens({ queryParameters: accountTokens.value.prev })
}

async function loadNextAccountTokens() {
  await fetchAccountTokens({ queryParameters: accountTokens.value.next })
}
</script>

<style scoped>
.account-tokens-panel__account-tokens-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
