<template>
  <app-panel class="account-activities-panel">
    <paginated-content
      :entities="accountActivities"
      pagination-style="history"
      @prev-clicked="loadPrevActivities"
      @next-clicked="loadNextActivities">
      <account-activities-table
        class="account-activities-panel__account-activities-table"
        :account-details="accountDetails"
        :account-activities="accountActivities"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchAccountActivities } = useAccountStore()
const { accountActivities, accountDetails } = storeToRefs(useAccountStore())

function loadPrevActivities() {
  return fetchAccountActivities({
    queryParameters: accountActivities.value.prev.substring(3),
  })
}

function loadNextActivities() {
  return fetchAccountActivities({
    queryParameters: accountActivities.value.next.substring(3),
  })
}
</script>

<style scoped>
.account-activities-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__account-activities-table {
    @media (--desktop) {
      margin-bottom: var(--space-2);
    }
  }
}
</style>
