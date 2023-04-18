<template>
  <div class="transactions-table-condensed">
    <table
      v-for="transaction in transactions.data"
      :key="transaction.hash"
      class="transactions-table-condensed__table">
      <tbody>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            Hash
          </th>
          <td class="transactions-table-condensed__data">
            <value-hash-ellipsed
              :link-to="`/transactions/${transaction.hash}`"
              :hash="transaction.hash"/>
          </td>
        </tr>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            Created
          </th>
          <td class="transactions-table-condensed__data">
            <div>
              {{ transaction.createdHeight }}
            </div>
            <datetime-label :datetime="transaction.created"/>
          </td>
        </tr>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            Type
          </th>
          <td class="transactions-table-condensed__data">
            {{ transaction.type }}
          </td>
        </tr>
        <tr class="transactions-table-condensed__row">
          <th class="transactions-table-condensed__header">
            Data
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

<script>
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'TransactionTableCondensed',
  components: {
    ValueHashEllipsed,
    DatetimeLabel,
    TransactionCell,
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
    border-bottom: 1px solid var(--color-midnight-15);
    padding-right: var(--space-4);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
