<template>
  <div class="recent-accounts-table__container">
    <table class="recent-accounts-table">
      <thead>
        <tr>
          <th>
            Account
            <hint-tooltip>
              {{ topAccountsHints.account }}
            </hint-tooltip>
          </th>
          <th>
            Last Transaction
            <hint-tooltip>
              {{ topAccountsHints.lastTransaction }}
            </hint-tooltip>
          </th>
          <th>
            Type
          </th>
          <th>
            <time-toggle-button>Last Active</time-toggle-button>
            <hint-tooltip>
              {{ topAccountsHints.lastActive }}
            </hint-tooltip>
          </th>
          <th>
            Block
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="account in recentAccounts"
          :key="account.account">
          <td class="recent-accounts-table__data">
            <div class="recent-accounts-table__account">
              <span
                class="recent-accounts-table__avatar"
                :style="{background: formatAvatarColor(account.account)}"/>
              <app-link
                :to="`/accounts/${account.account}`"
                :class="[
                  'recent-accounts-table__link',
                  {'recent-accounts-table__link--address': account.label === formatEllipseHash(account.account)},
                ]">
                {{ account.label }}
              </app-link>
              <copy-button
                size="sm"
                :clipboard-text="account.account"/>
            </div>
          </td>
          <td class="recent-accounts-table__data">
            <value-hash-ellipsed
              :link-to="`/transactions/${account.lastTxHash}`"
              :hash="account.lastTxHash"/>
          </td>
          <td class="recent-accounts-table__data">
            <span class="recent-accounts-table__type">
              {{ account.lastTxType }}
            </span>
          </td>
          <td class="recent-accounts-table__data">
            <timestamp-label :timestamp="account.lastActive"/>
          </td>
          <td class="recent-accounts-table__data">
            <app-link :to="`/keyblocks/${account.lastActiveHeight}`">
              {{ account.lastActiveHeight }}
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { topAccountsHints } from '@/utils/hints/topAccountsHints'

defineProps({
  recentAccounts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.recent-accounts-table {
  margin-bottom: 0;
  white-space: nowrap;

  &__container {
    overflow-x: auto;
  }

  &__data {
    white-space: nowrap;
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

  &__type {
    display: inline-block;
    padding: 3px 9px;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--c-teal);
    background: var(--up-soft);
    border-radius: 6px;
  }

  th,
  td {
    padding-right: 22px;
    padding-left: 22px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  thead tr {
    background: transparent;
    border-bottom: 1px solid var(--border);
  }
}
</style>
