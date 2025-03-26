<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
          Oracle
        </th>
        <td>
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ formatNullable(transactionData.oracleId) }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.oracleTtl }}
          </hint-tooltip>
          Oracle TTL / Type
        </th>
        <td>
          {{ transactionData.oracleTtl.value }}
          /
          {{ transactionData.oracleTtl.type }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.queryFee }}
          </hint-tooltip>
          Query Fee
        </th>
        <td>
          <price-label :price="formatAettosToAe(transactionData.queryFee)"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.queryFormat }}
          </hint-tooltip>
          Query Format
        </th>
        <td>
          {{ transactionData.queryFormat }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.responseFormat }}
          </hint-tooltip>
          Response Format
        </th>
        <td>
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
@import url("../assets/styles/utilities/_detail-table.css");

.transaction-type-panel-oracle-register-tx {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
