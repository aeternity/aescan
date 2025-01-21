<template>
  <div>
    <table
      v-for="account in topAccounts"
      :key="account.account"
      class="top-accounts-table-condensed__table">
      <tbody>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <hint-tooltip>
              {{ topAccountsHints.rank }}
            </hint-tooltip>
            Rank
          </th>
          <td class="top-accounts-table-condensed__data">
            {{ account.rank }}.
          </td>
        </tr>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <hint-tooltip>
              {{ topAccountsHints.account }}
            </hint-tooltip>
            Account
          </th>
          <td class="top-accounts-table-condensed__data">
            <value-hash-ellipsed
              :hash="account.account"
              :link-to="`/accounts/${account.account}`"/>
          </td>
        </tr>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <hint-tooltip>
              {{ topAccountsHints.balance }}
            </hint-tooltip>
            Balance
          </th>
          <td class="top-accounts-table-condensed__data">
            <price-label :price="account.balance "/>
          </td>
        </tr>
        <tr class="top-accounts-table-condensed__row">
          <th class="top-accounts-table-condensed__header">
            <hint-tooltip>
              {{ topAccountsHints.percentage }}
            </hint-tooltip>
            % Of Circulating
          </th>
          <td class="top-accounts-table-condensed__data">
            {{ account.percentage }} %
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
.top-accounts-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
