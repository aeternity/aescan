<template>
  <app-panel class="account-activities-panel">
    <paginated-content
      :entities="accountActivities"
      :limit="limit"
      pagination-style="history"
      @prev-clicked="loadPrevActivities"
      @next-clicked="loadNextActivities">
      <account-activities-table
        class="account-activities-panel__account-activities-table u-hidden-mobile"
        :account-details="accountDetails"
        :account-activities="accountActivities"/>

      <account-activities-table-condensed
        class="u-hidden-desktop"
        :account-details="accountDetails"
        :account-activities="accountActivities"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useAccountStore } from '@/stores/accountDetails'
import AccountActivitiesTable from '@/components/AccountActivitiesTable'
import AccountActivitiesTableCondensed from '@/components/AccountActivitiesTableCondensed'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'

const accountStore = useAccountStore()
const { fetchAccountActivities } = accountStore
const { accountActivities, accountDetails } = storeToRefs(accountStore)

const limit = computed(() => isDesktop() ? 10 : 3)

function loadPrevActivities() {
  return fetchAccountActivities({
    queryParameters: accountActivities.value.prev,
  })
}

function loadNextActivities() {
  return fetchAccountActivities({
    queryParameters: accountActivities.value.next,
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
