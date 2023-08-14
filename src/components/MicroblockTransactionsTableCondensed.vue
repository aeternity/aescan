<template>
  <div class="microblock-transactions-table-condensed">
    <table
      v-for="transaction in transactions?.data"
      :key="transaction.hash"
      class="microblock-transactions-table-condensed__table">
      <tbody>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ microblocksHints.transactionHash }}
              </template>
            </app-tooltip>
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <value-hash-ellipsed
              :hash="transaction.hash"
              :link-to="`/transactions/${transaction.hash}`"/>
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <app-tooltip>
              Time
              <template #tooltip>
                {{ microblocksHints.transactionTime }}
              </template>
            </app-tooltip>
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <div>
              <app-link
                :to="`/keyblocks/${transaction.createdHeight}`">
                {{ transaction.createdHeight }}
              </app-link>
            </div>
            <datetime-label :datetime="transaction.created"/>
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <app-tooltip>
              Type
              <template #tooltip>
                {{ microblocksHints.transactionType }}
              </template>
            </app-tooltip>
          </th>
          <td class="microblock-transactions-table-condensed__data">
            <app-tooltip>
              {{ transaction.type }}
              <template #tooltip>
                {{ transactionsHints[transaction.hintKey] }}
              </template>
            </app-tooltip>
          </td>
        </tr>
        <tr class="microblock-transactions-table-condensed__row">
          <th class="microblock-transactions-table-condensed__header">
            <app-tooltip>
              Data
              <template #tooltip>
                {{ microblocksHints.transactionData }}
              </template>
            </app-tooltip>
          </th>
          <td class="microblock-transactions-table-condensed__data">
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
import AppTooltip from '@/components/AppTooltip'
import DatetimeLabel from '@/components/DatetimeLabel'
import { microblocksHints } from '@/utils/hints/microblocksHints'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.microblock-transactions-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-4);
  }

  &__header {
    border-bottom: 1.5px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
