<template>
  <app-panel class="account-tokens-panel">
    <paginated-content
      v-model:limit="pageLimit"
      :entities="accountTokens"
      @prev-clicked="loadPrevAccountTokens"
      @next-clicked="loadNextAccountTokens">
      <account-tokens-table :account-tokens="accountTokens"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const route = useRoute()
const { fetchAccountTokens } = useAccountStore()
const { accountTokens } = storeToRefs(useAccountStore())

const pageLimit = usePageLimit('account-tokens')

watch(pageLimit, () => {
  fetchAccountTokens({ accountId: route.params.id, limit: pageLimit.value })
})

async function loadPrevAccountTokens() {
  await fetchAccountTokens({ queryParameters: accountTokens.value.prev.substring(3) })
}

async function loadNextAccountTokens() {
  await fetchAccountTokens({ queryParameters: accountTokens.value.next.substring(3) })
}
</script>

<style scoped>
.account-tokens-panel__account-tokens-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
