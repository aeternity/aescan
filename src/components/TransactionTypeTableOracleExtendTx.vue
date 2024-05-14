<template>
  <table class="transaction-type-panel-oracle-extend-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-extend-tx__row">
        <th class="transaction-type-panel-oracle-extend-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-extend-tx__data">
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ transactionData.oracleId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-extend-tx__row">
        <th class="transaction-type-panel-oracle-extend-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.oracleTtl }}
          </hint-tooltip>
          Oracle TTL / Type
        </th>
        <td class="transaction-type-panel-oracle-extend-tx__data">
          {{ transactionData.oracleTtl.value }}
          /
          {{ transactionData.oracleTtl.type }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-oracle-extend-tx {
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
