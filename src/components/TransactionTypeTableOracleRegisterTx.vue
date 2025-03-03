<template>
  <table class="transaction-type-panel-oracle-register-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ formatNullable(transactionData.oracleId) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.oracleTtl }}
          </hint-tooltip>
          Oracle TTL / Type
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.oracleTtl.value }}
          /
          {{ transactionData.oracleTtl.type }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryFee }}
          </hint-tooltip>
          Query Fee
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          <price-label :price="formatAettosToAe(transactionData.queryFee)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryFormat }}
          </hint-tooltip>
          Query Format
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.queryFormat }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.responseFormat }}
          </hint-tooltip>
          Response Format
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.responseFormat }}
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
.transaction-type-panel-oracle-register-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: var(--space-1);
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
