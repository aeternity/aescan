<template>
  <table class="transactions-table__table">
    <thead>
      <tr>
        <th>Hash</th>
        <th>Created</th>
        <th>Type</th>
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
<script>
import HashSymbol from '@/components/HashSymbol'
import TransactionCell from '@/components/TransactionCell'
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'TransactionTable',
  components: {
    ValueHashEllipsed,
    DatetimeLabel,
    TransactionCell,
    HashSymbol,
  },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
  },
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
