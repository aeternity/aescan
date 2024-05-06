<template>
  <div>
    <table
      v-for="transaction in accountTransactions.data"
      :key="transaction.hash"
      class="account-transactions-table-condensed__table">
      <tbody>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ accountHints.hash }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-transactions-table-condensed__data">
            <value-hash-ellipsed
              :hash="transaction.hash"
              :link-to="`/transactions/${transaction.hash}`"/>
          </td>
        </tr>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            <app-tooltip>
              <time-toggle-button/>
              <template #tooltip>
                {{ accountHints.time }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-transactions-table-condensed__data">
            <block-time-cell
              :height="transaction.createdHeight"
              :timestamp="transaction.created"/>
          </td>
        </tr>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            <app-tooltip>
              Type
              <template #tooltip>
                {{ accountHints.type }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-transactions-table-condensed__data">
            <app-tooltip>
              {{ transaction.type }}
              <template #tooltip>
                {{ transactionsHints[transaction.hintKey] }}
              </template>
            </app-tooltip>
          </td>
        </tr>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            <app-tooltip>
              Data
              <template #tooltip>
                {{ accountHints.data }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-transactions-table-condensed__data">
            <transaction-cell
              :transaction-type="transaction.type"
              :transaction-data="transaction.data"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'
import { accountHints } from '@/utils/hints/accountHints'
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppTooltip from '@/components/AppTooltip'

defineProps({
  accountTransactions: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-transactions-table-condensed {
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
