<template>
  <table>
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
    </tr>
    <tr
      v-for="transaction in transactions.data"
      :key="transaction.hash">
      <td>
        <app-link
          :to="`/transactions/${transaction.hash}`">
          {{ transaction.hash }}
        </app-link>
      </td>
      <td>
        <datetime-label :datetime="transaction.time"/>
      </td>
    </tr>
  </table>
</template>
<script setup>
import { microblocksHints } from '@/utils/hints/microblocksHints'

defineProps({
  transactions: {
    type: Object,
    required: true,
  },
})
</script>
