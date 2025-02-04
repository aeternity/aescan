<template>
  <table>
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ contractsHints.callTransactionsHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button/>
          <hint-tooltip>
            {{ contractsHints.callTransactionsTime }}
          </hint-tooltip>
        </th>
        <th>
          Caller
          <hint-tooltip>
            {{ contractsHints.callTransactionsCaller }}
          </hint-tooltip>
        </th>
        <th>
          Entrypoint
          <hint-tooltip>
            {{ contractsHints.callTransactionsEntryPoint }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in contractCallTransactions.data"
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
          <value-hash-ellipsed
            :hash="transaction.data.callerId"
            :link-to="`/accounts/${transaction.data.callerId}`"/>
        </td>
        <td>
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
    </tbody>
  </table>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'

defineProps({
  contractCallTransactions: {
    type: Object,
    default: null,
  },
})
</script>
