<template>
  <div class="state-channel-transactions-table-condensed">
    <table
      v-for="transaction in transactions?.data"
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
            <div>
              <app-link
                :to="`/keyblocks/${transaction.createdHeight}`">
                {{ transaction.createdHeight }}
              </app-link>
            </div>
            <datetime-label :datetime="transaction.created"/>
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
import DatetimeLabel from '@/components/DatetimeLabel'
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
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: var(--space-1);
    }

    @media (--desktop) {
      padding: var(--space-4);
    }
  }

  &__header {
    border-bottom: 1.5px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
