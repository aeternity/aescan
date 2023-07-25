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
          Time
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
        v-for="transaction in transactions?.data"
        :key="transaction.hash">
        <td>
          <hash-symbol>th</hash-symbol>

          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td>
          <div>
            <app-link
              :to="`/keyblocks/${transaction.createdHeight}`">
              {{ transaction.createdHeight }}
            </app-link>
          </div>
          <datetime-label :datetime="transaction.created"/>
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
import HashSymbol from '@/components/HashSymbol'
import HintTooltip from '@/components/HintTooltip'
import DatetimeLabel from '@/components/DatetimeLabel'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>
