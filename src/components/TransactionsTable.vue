<template>
  <table class="transactions-table__table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ transactionsHints.hash }}
          </hint-tooltip>
        </th>
        <th>
          Created
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
          <div>
            <app-link
              :to="`/keyblocks/${transaction.createdHeight}`">
              {{ transaction.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="transaction.created"/>
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
import TransactionCell from '@/components/TransactionCell'
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.transactions-table {
  &__table {
    margin-bottom: var(--space-2);
  }

  &__data {
    vertical-align: top;
  }
}
</style>
