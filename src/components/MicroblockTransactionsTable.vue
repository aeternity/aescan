<template>
  <table class="microblock-transactions-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ microblocksHints.transactionHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button/>
          <hint-tooltip>
            {{ microblocksHints.transactionTime }}
          </hint-tooltip>
        </th>
        <th>
          Type
          <hint-tooltip>
            {{ microblocksHints.transactionType }}
          </hint-tooltip>
        </th>
        <th>
          Data
          <hint-tooltip>
            {{ microblocksHints.transactionData }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions.data"
        :key="transaction.hash">
        <td class="microblock-transactions-table__data">
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td class="microblock-transactions-table__data">
          <block-time-cell
            :height="transaction.createdHeight"
            :timestamp="transaction.created"/>
        </td>
        <td class="microblock-transactions-table__data">
          {{ transaction.type }}
          <hint-tooltip>
            {{ transactionsHints[transaction.hintKey] }}
          </hint-tooltip>
        </td>
        <td class="microblock-transactions-table__data">
          <transaction-cell
            :transaction-type="transaction.type"
            :transaction-data="transaction.data"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
.microblock-transactions-table__data {
  white-space: nowrap;
}
</style>
