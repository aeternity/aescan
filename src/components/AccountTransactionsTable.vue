<template>
  <table class="account-transactions-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ accountHints.hash }}
          </hint-tooltip>
        </th>
        <th>
          Time
          <hint-tooltip>
            {{ accountHints.time }}
          </hint-tooltip>
        </th>
        <th>
          Type
          <hint-tooltip>
            {{ accountHints.type }}
          </hint-tooltip>
        </th>
        <th>
          Data
          <hint-tooltip>
            {{ accountHints.data }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in accountTransactions.data"
        :key="transaction.hash">
        <td>
          <value-hash-ellipsed
            :hash="transaction.hash"
            :link-to="`/transactions/${transaction.hash}`"/>
        </td>
        <td>
          <block-time-cell
            :height="transaction.createdHeight"
            :datetime="transaction.created"/>
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
import TransactionCell from '@/components/TransactionCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { accountHints } from '@/utils/hints/accountHints'
import HintTooltip from '@/components/HintTooltip'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  accountTransactions: {
    type: Object,
    default: null,
  },
})
</script>
