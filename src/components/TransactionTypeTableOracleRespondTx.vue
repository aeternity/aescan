<template>
  <table class="transaction-type-panel-oracle-respond-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ transactionData.oracleId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryId }}
          </hint-tooltip>
          Query ID
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          {{ transactionData.queryId }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.response }}
          </hint-tooltip>
          Response
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          {{ formatDecodeByteArray(transactionData.response) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.responseTtl }}
          </hint-tooltip>
          Response TTL / Type
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          {{ transactionData.responseTtl.value }}
          /
          {{ transactionData.responseTtl.type }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'
import { formatDecodeByteArray } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-oracle-respond-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
    @media (--desktop) {
      width: 400px;
    }
  }

  &__data {
    word-wrap: break-word;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
