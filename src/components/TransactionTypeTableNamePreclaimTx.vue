<template>
  <table class="transaction-type-panel-name-preclaim-tx__table">
    <tbody>
      <tr class="transaction-type-panel-name-preclaim-tx__row">
        <th class="transaction-type-panel-name-preclaim-tx__table-header">
          Claimer
          <hint-tooltip>
            {{ namesHints.preclaimer }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-name-preclaim-tx__data">
          <app-link :to="`/accounts/${transactionData.account_id}`">
            {{ transactionData.account_id }}
          </app-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'
import AppLink from '@/components/AppLink'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-name-preclaim-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
