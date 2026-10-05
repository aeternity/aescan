<template>
  <overview-tile label="Total Accounts">
    {{ formatNullable(formatNumber(totalAccountsCount)) }}
  </overview-tile>
  <overview-tile label="Active Accounts (24h)">
    {{ formatNullable(formatNumber(activeAccountsCount)) }}
    <span
      v-if="activeAccountsDelta"
      :class="[
        'accounts-statistics__delta',
        {'accounts-statistics__delta--down': isDeltaNegative},
      ]">
      {{ isDeltaNegative ? '↓' : '↑' }} {{ Math.abs(activeAccountsDelta) }}%
    </span>
  </overview-tile>
</template>

<script setup>
const { fetchTopAccounts } = useTopAccountsStore()
const { totalAccountsCount, activeAccountsCount, activeAccountsDelta } = storeToRefs(useTopAccountsStore())

const isDeltaNegative = computed(() => Number(activeAccountsDelta.value) < 0)

if (import.meta.client) {
  fetchTopAccounts()
}
</script>

<style scoped>
.accounts-statistics {
  &__delta {
    padding: 3px 8px;
    font-family: var(--font-primary);
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0;
    color: var(--up);
    background: var(--up-soft);
    border-radius: 6px;

    &--down {
      color: var(--down);
      background: var(--down-soft);
    }
  }
}
</style>
