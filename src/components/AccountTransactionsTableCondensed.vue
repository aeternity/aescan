<template>
  <div class="account-transactions-table-condensed">
    <table
      v-for="transaction in accountTransactions?.data"
      :key="transaction.hash"
      class="account-transactions-table-condensed__table">
      <tbody>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            Hash
          </th>
          <td class="account-transactions-table-condensed__data">
            <value-hash-ellipsed
              :hash="transaction.hash"
              :link-to="`/transactions/${transaction.hash}`"/>

            <div class="account-transactions-panel__blocks-ago">
              {{ formatBlocksRelative(transaction.createdHeightDiff) }}
            </div>
          </td>
        </tr>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            Time
          </th>
          <td class="account-transactions-table-condensed__data">
            <datetime-label :datetime="transaction.created"/>
          </td>
        </tr>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            Type
          </th>
          <td class="account-transactions-table-condensed__data">
            {{ transaction.type }}
          </td>
        </tr>
        <tr class="account-transactions-table-condensed__row">
          <th class="account-transactions-table-condensed__header">
            Data
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

<script>
import TransactionCell from '@/components/TransactionCell'
import { formatBlocksRelative } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'AccountTransactionsTableCondensed',
  components: { ValueHashEllipsed, DatetimeLabel, TransactionCell },
  props: {
    accountTransactions: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatBlocksRelative,
  },
}
</script>

<style scoped>
.account-transactions-table-condensed {
  padding: var(--space-4) 0 0;

  &__table {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: var(--space-1);
    }

    @media (--desktop) {
      padding: var(--space-4);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
    font-family: var(--font-monospaced);
  }
}
</style>
