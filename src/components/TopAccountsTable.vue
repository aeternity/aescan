<template>
  <div class="top-accounts-table__container">
    <table class="top-accounts-table">
      <thead>
        <tr>
          <th class="top-accounts-table__rank">
            Rank
            <hint-tooltip>
              {{ topAccountsHints.rank }}
            </hint-tooltip>
          </th>
          <th>
            Account
            <hint-tooltip>
              {{ topAccountsHints.account }}
            </hint-tooltip>
          </th>
          <th class="top-accounts-table__numeric">
            Balance
            <hint-tooltip>
              {{ topAccountsHints.balance }}
            </hint-tooltip>
          </th>
          <th class="top-accounts-table__numeric">
            % Of Circulating
            <hint-tooltip>
              {{ topAccountsHints.percentage }}
            </hint-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="account in topAccounts"
          :key="account.account">
          <td class="top-accounts-table__data top-accounts-table__rank">
            {{ account.rank }}
          </td>
          <td class="top-accounts-table__data">
            <div class="top-accounts-table__account">
              <span
                class="top-accounts-table__avatar"
                :style="{background: formatAvatarColor(account.account)}"/>
              <app-link
                :to="`/accounts/${account.account}`"
                :class="[
                  'top-accounts-table__link',
                  {'top-accounts-table__link--address': account.label === formatEllipseHash(account.account)},
                ]">
                {{ account.label }}
              </app-link>
              <copy-button
                size="sm"
                :clipboard-text="account.account"/>
            </div>
          </td>
          <td class="top-accounts-table__data top-accounts-table__numeric">
            <price-label
              :price="account.balance"
              :has-icon="false"/>
          </td>
          <td class="top-accounts-table__data top-accounts-table__numeric top-accounts-table__percentage">
            {{ account.percentage }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { topAccountsHints } from '@/utils/hints/topAccountsHints'

defineProps({
  topAccounts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.top-accounts-table {
  margin-bottom: 0;
  white-space: nowrap;

  &__container {
    overflow-x: auto;
  }

  &__data {
    white-space: nowrap;
  }

  &__rank {
    width: 52px;
  }

  td.top-accounts-table__rank {
    font-family: var(--font-monospaced);
    color: var(--text-faint);
  }

  &__numeric {
    text-align: right;

    :deep(.price-label) {
      justify-content: flex-end;
    }
  }

  &__percentage {
    font-family: var(--font-monospaced);
    color: var(--text-dim);
  }

  &__account {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  &__avatar {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 9px;
    opacity: 0.9;
  }

  &__link {
    font-weight: 600;

    &--address {
      font-weight: 400;
      color: var(--text);
    }
  }
}
</style>
