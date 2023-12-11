<template>
  <div>
    <table
      v-for="transaction in transactions.data"
      :key="transaction.hash"
      class="state-channel-transactions-table-condensed__table">
      <tbody>
        <tr class="state-channel-transactions-table-condensed__row">
          <th class="state-channel-transactions-table-condensed__header">
            Hash
          </th>
          <td class="state-channel-transactions-table-condensed__data">
            <value-hash-ellipsed
              :hash="transaction.hash"
              :link-to="`/transactions/${transaction.hash}`"/>
          </td>
        </tr>
        <tr class="state-channel-transactions-table-condensed__row">
          <th class="state-channel-transactions-table-condensed__header">
            Time
          </th>
          <td class="state-channel-transactions-table-condensed__data">
            <block-time-cell
              :height="transaction.createdHeight"
              :datetime="transaction.created"/>
          </td>
        </tr>
        <tr class="state-channel-transactions-table-condensed__row">
          <th class="state-channel-transactions-table-condensed__header">
            Type
          </th>
          <td class="state-channel-transactions-table-condensed__data">
            {{ transaction.type }}
          </td>
        </tr>
        <tr class="state-channel-transactions-table-condensed__row">
          <th class="state-channel-transactions-table-condensed__header">
            Data
          </th>
          <td class="state-channel-transactions-table-condensed__data">
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

defineProps({
  transactions: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.state-channel-transactions-table-condensed {
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
}
</style>
