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
        <td>
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td>
          <block-time-cell
            :height="transaction.createdHeight"
            :timestamp="transaction.created"/>
        </td>
        <td>
          {{ transaction.type }}
          <hint-tooltip>
            {{ transactionsHints[transaction.hintKey] }}
          </hint-tooltip>
        </td>
        <td>
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
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import HintTooltip from '@/components/HintTooltip'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>
