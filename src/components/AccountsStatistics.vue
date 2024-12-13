<template>
  <div class="accounts-statistics">
    <app-panel class="account-statistics__panel">
      <h5>TOTAL ACCOUNTS</h5>
      <div class="accounts-statistics__value">
        {{ formatNumber(totalAccountsCount) }}
      </div>
    </app-panel>
    <app-panel class="accounts-statistics__panel">
      <h5>ACTIVE ACCOUNTS (LAST 24H)</h5>
      <div class="accounts-statistics__value">
        {{ formatNumber(activeAccountsCount) }}
      </div>
    </app-panel>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useTopAccountsStore } from '@/stores/topAccounts'
import { formatNumber } from '@/utils/format'

const { fetchTopAccounts } = useTopAccountsStore()

const { totalAccountsCount, activeAccountsCount } = storeToRefs(useTopAccountsStore())

if (process.client) {
  await fetchTopAccounts()
}
</script>

<style scoped>
.accounts-statistics {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  margin-bottom: var(--space-2);

  @media (--desktop) {
    flex-direction: row;
  }

  &__panel {
    padding: var(--space-4);
    width: 100%;

    @media (--desktop) {
      width: 50%;
    }
  }

  &__value {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    font-size: 36px;
    font-family: var(--font-monospaced);
    font-weight: 400;
    margin-top: var(--space-3);
  }
}
</style>
