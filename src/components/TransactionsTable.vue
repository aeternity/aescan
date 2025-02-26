<template>
  <table class="transactions-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ transactionsHints.hash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Created</time-toggle-button>
          <hint-tooltip>
            {{ transactionsHints.created }}
          </hint-tooltip>
        </th>
        <th>
          Type
          <hint-tooltip>
            {{ transactionsHints.type }}
          </hint-tooltip>
        </th>
        <th>
          Data
          <hint-tooltip>
            {{ transactionsHints.data }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash">
        <td class="transactions-table__data">
          <value-hash-ellipsed
            :link-to="`/transactions/${transaction.hash}`"
            :hash="transaction.hash"/>
        </td>
        <td class="transactions-table__data">
          <block-time-cell
            :height="transaction.createdHeight"
            :timestamp="transaction.created"/>
        </td>
        <td class="transactions-table__data">
          {{ transaction.type }}
          <hint-tooltip>
            {{ transactionsHints[transaction.hintKey] }}
          </hint-tooltip>
        </td>
        <td class="transactions-table__data">
          <transaction-cell
            :transaction-type="transaction.type"
            :transaction-data="transaction.data"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.transactions-table {
  margin-bottom: var(--space-4);

  &__data {
    vertical-align: top;
    white-space: nowrap;
  }
}
</style>
