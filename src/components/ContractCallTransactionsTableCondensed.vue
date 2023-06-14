<template>
  <div class="contract-call-transactions-table-condensed">
    <table
      v-for="transaction in contractCallTransactions.data"
      :key="transaction.hash"
      class="contract-call-transactions-table-condensed__table">
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          Hash
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          Time
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <div>
            {{ transaction.createdHeight }}
          </div>
          <datetime-label :datetime="transaction.created"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          Type
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :hash="transaction.data.caller_id"
            :link-to="`/accounts/${transaction.data.caller_id}`"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          Entry point
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <app-chip v-if="transaction.data.function" size="sm">
            {{ transaction.data.function }}
          </app-chip>
          <template v-else>
            N/A
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import DatetimeLabel from '@/components/DatetimeLabel'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import AppChip from '@/components/AppChip'

defineProps({
  contractCallTransactions: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.contract-call-transactions-table-condensed {
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
  }
}
</style>
