<template>
  <div>
    <table
      v-for="transaction in transactions.data"
      :key="transaction.hash"
      class="transactions-table-condensed__table">
      <tbody>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ transactionsHints.hash }}
              </template>
            </app-tooltip>
          </th>
          <td class="transactions-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/transactions/${transaction.hash}`"
              :hash="transaction.hash"/>
          </td>
        </tr>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            <app-tooltip>
              <time-switch-button>Created</time-switch-button>
              <template #tooltip>
                {{ transactionsHints.created }}
              </template>
            </app-tooltip>
          </th>
          <td class="transactions-table-condensed__data">
            <block-time-cell
              :height="transaction.createdHeight"
              :timestamp="transaction.created"/>
          </td>
        </tr>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            <app-tooltip>
              Type
              <template #tooltip>
                {{ transactionsHints.type }}
              </template>
            </app-tooltip>
          </th>
          <td class="transactions-table-condensed__data">
            <app-tooltip>
              {{ transaction.type }}
              <template #tooltip>
                {{ transactionsHints[transaction.hintKey] }}
              </template>
            </app-tooltip>
          </td>
        </tr>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            <app-tooltip>
              Data
              <template #tooltip>
                {{ transactionsHints.data }}
              </template>
            </app-tooltip>
          </th>
          <td class="transactions-table-condensed__data">
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
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.transactions-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
