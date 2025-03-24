<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ namesHints.preclaimer }}
          </hint-tooltip>
          Claimer
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.accountId}`">
            {{ transactionData.accountId }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");
</style>
