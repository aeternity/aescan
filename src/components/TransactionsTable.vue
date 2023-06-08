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
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash">
        <td class="transactions-table__data">
          <hash-symbol>th</hash-symbol>
          <value-hash-ellipsed
            :link-to="`/transactions/${transaction.hash}`"
            :hash="transaction.hash"/>
        </td>
        <td class="transactions-table__data">
          <div>
            {{ transaction.createdHeight }}
          </div>
          <datetime-label :datetime="transaction.created"/>
        </td>
        <td class="transactions-table__data">
          {{ transaction.type }}
          <hint-tooltip>
            {{ transactionsHints[getHintKey(transaction.type)] }}
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
import HashSymbol from '@/components/HashSymbol'
import TransactionCell from '@/components/TransactionCell'
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})

function getHintKey(type) {
  return type.charAt(0).toLowerCase() + type.slice(1)
}
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
