<template>
  <table class="transaction-type-panel-name-preclaim-tx__table">
    <tbody>
      <tr class="transaction-type-panel-name-preclaim-tx__row">
        <th class="transaction-type-panel-name-preclaim-tx__table-header">
          <hint-tooltip>
            {{ namesHints.preclaimer }}
          </hint-tooltip>
          Claimer
        </th>
        <td class="transaction-type-panel-name-preclaim-tx__data">
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
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
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
