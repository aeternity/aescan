<template>
  <div class="accounts-statistics">
    <div class="accounts-statistics__tile">
      <div class="accounts-statistics__label">
        Total Accounts
      </div>
      <div class="accounts-statistics__value">
        {{ formatNullable(formatNumber(totalAccountsCount)) }}
      </div>
    </div>
    <div class="accounts-statistics__tile">
      <div class="accounts-statistics__label">
        Active Accounts (24h)
      </div>
      <div class="accounts-statistics__value">
        {{ formatNullable(formatNumber(activeAccountsCount)) }}
        <span
          v-if="activeAccountsDelta"
          :class="[
            'accounts-statistics__delta',
            {'accounts-statistics__delta--down': isDeltaNegative},
          ]">
          {{ isDeltaNegative ? '↓' : '↑' }} {{ Math.abs(activeAccountsDelta) }}%
        </span>
      </div>
    </div>
  </div>
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
  display: flex;
  flex-direction: column;
  gap: 14px;

  &__tile {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 15px 18px;
    background: var(--bg-elev);
    border: 1px solid var(--border);
    border-radius: 14px;
  }

  &__label {
    margin-bottom: 7px;
    font-size: 11.5px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  &__value {
    display: flex;
    align-items: baseline;
    gap: 9px;
    font-family: var(--font-monospaced);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text);
  }

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
