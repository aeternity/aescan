<template>
  <div class="transactions-table-condensed">
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
              Created
              <template #tooltip>
                {{ transactionsHints.created }}
              </template>
            </app-tooltip>
          </th>
          <td class="transactions-table-condensed__data">
            <div>
              <app-link
                :to="`/keyblocks/${transaction.createdHeight}`">
                {{ transaction.createdHeight }}
              </app-link>
            </div>
            <datetime-label :datetime="transaction.created"/>
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
import DatetimeLabel from '@/components/DatetimeLabel'
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
    background: var(--color-white);
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);

    &:last-of-type {
      margin-bottom: var(--space-2);
    }
  }

  &__header {
    border-bottom: 1.5px solid var(--color-midnight-15);
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
