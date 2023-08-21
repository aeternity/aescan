<template>
  <div>
    <table
      v-for="transaction in contractCallTransactions.data"
      :key="transaction.hash"
      class="contract-call-transactions-table-condensed__table">
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Hash
            <template #tooltip>
              {{ contractsHints.callTransactionsHash }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Time
            <template #tooltip>
              {{ contractsHints.callTransactionsTime }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <div>
            <app-link
              :to="`/keyblocks/${transaction.createdHeight}`">
              {{ transaction.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="transaction.created"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Caller
            <template #tooltip>
              {{ contractsHints.callTransactionsCaller }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <value-hash-ellipsed
            :hash="transaction.data.callerId"
            :link-to="`/accounts/${transaction.data.callerId}`"/>
        </td>
      </tr>
      <tr class="contract-call-transactions-table-condensed__row">
        <th class="contract-call-transactions-table-condensed__header">
          <app-tooltip>
            Entrypoint
            <template #tooltip>
              {{ contractsHints.callTransactionsEntryPoint }}
            </template>
          </app-tooltip>
        </th>
        <td class="contract-call-transactions-table-condensed__data">
          <app-chip
            v-if="transaction.data.function"
            size="sm">
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
import { contractsHints } from '@/utils/hints/contractsHints'

defineProps({
  contractCallTransactions: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.contract-call-transactions-table-condensed {
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
