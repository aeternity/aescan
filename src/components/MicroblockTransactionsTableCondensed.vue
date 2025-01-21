<template>
  <div>
    <table
      v-for="transaction in transactions.data"
      :key="transaction.hash"
      class="microblock-transactions-table-condensed__table">
      <tbody>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <hint-tooltip>
              {{ microblocksHints.transactionHash }}
            </hint-tooltip>
            Hash
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <value-hash-ellipsed
              :hash="transaction.hash"
              :link-to="`/transactions/${transaction.hash}`"/>
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <hint-tooltip>
              {{ microblocksHints.transactionHash }}
            </hint-tooltip>
            <time-toggle-button class="microblock-transactions-table-condensed__button"/>
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <block-time-cell
              :height="transaction.createdHeight"
              :timestamp="transaction.created"/>
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <hint-tooltip>
            {{ microblocksHints.transactionType }}
          </hint-tooltip>
          Type
          <th class="microblock-transactions-table-condensed__header"/>
          <td class="microblock-transactions-table-condensed__data">
            <hint-tooltip>
              {{ transactionsHints[transaction.hintKey] }}
            </hint-tooltip>
            {{ transaction.type }}
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <hint-tooltip>
              {{ microblocksHints.transactionData }}
            </hint-tooltip>
            Data
          </th>
          <td class="microblock-transactions-table-condensed__data">
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
import { microblocksHints } from '@/utils/hints/microblocksHints'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.microblock-transactions-table-condensed {
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

  &__button {
    margin-left: 3px;
  }
}
</style>
