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

          <div class="transactions-table__blocks-ago">
            {{ formatBlocksRelative(transaction.createdHeightDiff) }}
          </div>
        </td>
        <td class="transactions-table__data">
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
import { formatBlocksRelative } from '@/utils/format'
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
  methods: {
    formatBlocksRelative,
  },
}
</script>

<style scoped>
.transactions-table {
  &__table {
    margin-bottom: var(--space-2);
  }

  &__title {
    margin-right: var(--space-0);
  }

  &__data {
    vertical-align: top;
  }

  &__blocks-ago {
    margin-left: var(--space-5);
  }
}
</style>
